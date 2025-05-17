if (/iPhone|iPad/.test(navigator.userAgent)) {
    document.addEventListener("touchstart", function(event) {
        if (event.touches.length > 1) {
            event.preventDefault(); // Prevent double-tap zoom
        }
    }, { passive: false });
}


// Global skip functionality on the Advance button
// Global skip functionality on the Advance button
document.getElementById('Advance').addEventListener("click", function() {
    const resultBox = document.getElementById('result');
    // If no selection has been made, resultBox will not be visible.
    if (resultBox.style.display !== 'block') {
        // Get the correct layer based on currentRiver
        const correctLayer = paths[currentRiver];
        if (correctLayer) {
            // Show the correct layer tooltip as in handleSelection
            correctLayer.bindTooltip(currentRiver, { permanent: true, className: 'correct-tooltip' }).openTooltip();
        }
        // Optionally update the result box to show that the correct answer is being revealed.

        // After the timeout, close the tooltip and move to the next round
        
        
        setTimeout(() => {
            if (correctLayer) correctLayer.closeTooltip();
            nextRound();
        }, timeoutDuration);
    }
});


// Initialize the map

var isPhone = window.innerWidth <= 768;

// Set coordinates and zoom based on device
var initialCoords = isPhone ? [20.0760, 80.9629] : [20.5937, 80.9629]; // Mumbai for phone, India center for desktop
var zoomLevel = isPhone ? 4 : 5;


var map = L.map('map', {
    doubleClickZoom: false
}).setView(initialCoords, zoomLevel);


// map initialised 






map.on('tooltipopen', function (e) {
  const tooltipEl = e.tooltip.getElement();
  tooltipEl.addEventListener('mouseenter', () => {
    map.dragging.disable();
  
  });

  tooltipEl.addEventListener('mouseleave', () => {
    map.dragging.enable();
  
  });
});

// Define the bounds of the image (set these to match the geographical area of the image)
var imageBounds = [[-2.0, 36.78], 
				  [41.33, 121.216]];  // Latitude/Longitude for the image corners

// Add the local image as an overlay to the map
L.imageOverlay('../Map_Images/India_OS_dark.jpg', imageBounds).addTo(map);

// timeout code part 1
let timeoutDuration = 1400; // Default value

document.getElementById("timeoutSlider").addEventListener("input", function() {
    timeoutDuration = this.value;
    document.getElementById("timeoutValue").textContent = timeoutDuration;
});
//timeout code part 1 ends



// Function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Check if 'selection' parameter is 'wld'
if (getUrlParameter('selection').includes('wld')) {
    map.setView([0, 0], 2); // Center at (0,0) with zoom level 2
    map.setMaxZoom(6.3); 

    // Remove existing image layers
    document.querySelectorAll('.leaflet-image-layer.leaflet-zoom-animated, .leaflet-tile-container.leaflet-zoom-animated').forEach(layer => {
        layer.remove();
    });

    // Add the tile layer
    tileLayer = L.tileLayer('../Map_Images/map_tiles/{z}_{x}_{y}.png', {
        attribution: '&copy; CARTO',
        minZoom: 1,
        maxZoom: 8,       // Allow users to zoom up to level 7
        maxNativeZoom: 6, // Tells Leaflet the highest real tile zoom is 6
        tileSize: 256
    }).addTo(map);
    

    themeStylesheet.setAttribute("href", "theme4.css");

    // Set opacity to 0 with !important
    const style = document.createElement("style");
    style.innerHTML = ".leaflet-image-layer.leaflet-zoom-animated { opacity: 0 !important; }";
    document.head.appendChild(style);
}





// Function to parse different geometry types
function parseGeometry(geometry) {
    const type = geometry.split(' ')[0];
 
    if (type === "GEOMETRYCOLLECTION") {
        // Extract individual geometries inside the collection using regex
        const geometries = geometry.match(/(POLYGON) \(\([^)]+\)\)/g);
        if (!geometries) return [];

        let lines = [];

        for (const geom of geometries) {
            const parsed = parseGeometry(geom.trim());
            if (parsed) {
                if (Array.isArray(parsed)) {
                    lines.push(...parsed); // Flatten multiple LineStrings
                } else {
                    lines.push(parsed);
                }
            }
        }

        return lines; // Return array of LineStrings
    }

    const coords = geometry.replace(type, '').trim().slice(1, -1).split(', ');


    

    if (type === "POINT") {
        const [lon, lat] = coords[0].split(' ');
        return { type: 'Point', coordinates: [parseFloat(lat), parseFloat(lon)] };
    } else if (type === "POLYGON") {
        // Extract rings (outer & inner if any)
        const rings = geometry.match(/\(\(.+?\)\)/g);
        if (!rings) return null;
    
        let lines = rings.map(ring => {
            const points = ring.replace(/[()]/g, "").split(', ').map(coord => {
                const [lon, lat] = coord.split(' ').map(parseFloat);
                return [lat, lon]; // Flip order
            });
            return { type: 'LineString', coordinates: points, isPolygonBoundary: true }; // Add flag
        });
    
        return lines; // Return an array of LineStrings for each ring
    }
     else if (type === "LINESTRING") {
        const points = coords.map(coord => {
            const [lon, lat] = coord.split(' ').map(parseFloat);
            return [lat, lon]; // Flip order
        });
        return { type: 'LineString', coordinates: points };
    }

    return null;
}


// Get a random river name
// Keep track of shown rivers
let shownRivers = new Set();

function getRandomRiver() {
    const noRepeatChecked = document.getElementById('noRepeat').checked;
    let availableRivers = Object.keys(mapData).filter(river => !shownRivers.has(river));

    if (noRepeatChecked && availableRivers.length === 0) {
        // All rivers have been shown, display a prompt
        const resultBox = document.getElementById('result2');
        resultBox.textContent = "Iteration Completed.";
        resultBox.style.display = 'block';

        // Create a restart button dynamically
        const restartButton = document.createElement("button");
        restartButton.textContent = "Restart";
        restartButton.style.marginTop = "10px";
        restartButton.style.padding = "5px 10px";
        restartButton.style.cursor = "pointer";
        restartButton.onclick = function () {
            // Reset when button is clicked
            shownRivers.clear();
            availableRivers = Object.keys(mapData);

            // Hide message and restart the round
            resultBox.style.display = 'none';
            nextRound();
        };

        // Create a home button dynamically that looks the same as the restart button
        const homeButton = document.createElement("button");
        homeButton.textContent = "Home";
        homeButton.style.marginTop = "10px";
        homeButton.style.padding = "5px 10px";
        homeButton.style.cursor = "pointer";
        homeButton.onclick = function () {
            window.location.href = "../index.html";
        };

        // Append the buttons to the result box
        resultBox.innerHTML = ""; // Clear previous content
        resultBox.appendChild(document.createTextNode("Iteration Completed."));
        resultBox.appendChild(document.createElement("br"));
        resultBox.appendChild(restartButton);
        resultBox.appendChild(document.createElement("br")); // Add a break between buttons
        resultBox.appendChild(homeButton);

        return null; // Prevent selecting a new river until reset
    }

    const randomIndex = Math.floor(Math.random() * availableRivers.length);
    const selectedRiver = availableRivers[randomIndex];

    if (noRepeatChecked) {
        shownRivers.add(selectedRiver);
    }

    return selectedRiver;
}

var currentRiver = getRandomRiver(); // Initially pick a random location
document.getElementById('header').textContent = "" + currentRiver.split("(")[0].trim();

var selectedPath = null; // Track the selected path
var correctPath = null; // Track the correct path
var paths = {}; // Store paths by location name

// Loop through locations data and add them to the map

for (const river in mapData) {
    const parsedGeometry = parseGeometry(mapData[river]);

    if (!parsedGeometry) continue;

    if (Array.isArray(parsedGeometry)) {
        // GeometryCollection contains multiple geometries
        parsedGeometry.forEach(geo => addGeometryToMap(geo, river));
    } else {
        addGeometryToMap(parsedGeometry, river);
    }
}

function addGeometryToMap(geometry, river) {
    let layer;

    if (geometry.type === 'Point') {
        layer = L.circleMarker(geometry.coordinates, {
            radius: 4,
            color: '#EDC1A0',
            weight: 2,
            fillColor: '#FF9B50',
            fillOpacity: 1,
            className: 'point_leaflet'
        }).addTo(map);

      
        
    } else if (geometry.type === 'LineString') {
        let className = geometry.isPolygonBoundary ? 'polygon_leaflet' : 'line_leaflet'; // Check flag
    
        layer = L.polyline(geometry.coordinates, {
            color: '#EDC1A0',
            weight: 3,
            opacity: 1,
            className: className  // Apply correct class
        }).addTo(map);
    }


    

    if (layer) {
        paths[river] = layer;

        layer.on('mouseover', () => layer.setStyle({ color: '#D2D2D2' }));
        layer.on('mouseout', () => layer.setStyle({ color: '#EDC1A0' }));
        layer.on('click', (e) => handleSelection(river, layer, e));
    }
}





// Function to handle location selection
// Function to handle location selection
function handleSelection(river, path, event) {
    const resultBox = document.getElementById('result');
    
    const advanceButton = document.getElementById('Advance');
    const autoNextCheckbox = document.getElementById('auto_next');

    
    /* 
    const infoBox = document.querySelector('.info-text'); // Selecting the info box
        */    

    const correctPath = paths[currentRiver];
    
    path.bindTooltip(river, { permanent: true, className: 'selected-tooltip' }).openTooltip();

    
    /*
    // Extract content between [ and ] in currentRiver
    const match = currentRiver.match(/\[(.*?)\]/);
    if (match) {
        infoBox.textContent = match[1]; // Update info-text content
        infoBox.style.opacity = "1";   // Make info-text visible
    }
    */

    if (river === currentRiver) {
        // Correct location selected
        resultBox.textContent = "✔ Correct";
        resultBox.style.backgroundColor = "#029193";
    } else {
        // Incorrect location selected
        resultBox.textContent = "✘ Incorrect";
        resultBox.style.backgroundColor = "#894545";

        // Highlight the correct location
        if (correctPath) {
            correctPath.bindTooltip(currentRiver, { permanent: true, className: 'correct-tooltip' }).openTooltip();
        }
    }

    resultBox.style.display = 'block';

    // Move to the next round after a delay
     // Check if auto next is enabled
    if (autoNextCheckbox.checked) {
        // Auto-advance after a delay
        setTimeout(() => {
            path.closeTooltip();
            if (correctPath) correctPath.closeTooltip();
            nextRound();
        }, timeoutDuration);
    } else {
        // Show the Advance button and wait for user input
   
        advanceButton.style.pointerEvents = "auto"; // Enable button interaction

        function proceedToNextRound() {
            path.closeTooltip();
            if (correctPath) correctPath.closeTooltip();
            nextRound();

            // Hide the button again
         
            advanceButton.style.pointerEvents = "none";

            // Remove event listeners to prevent duplicates
            advanceButton.removeEventListener("click", proceedToNextRound);
            document.removeEventListener("keydown", spacebarListener);
        }

        function spacebarListener(event) {
            if (event.code === "Space") {
                proceedToNextRound();
            }
        }

        // Add event listeners
        advanceButton.addEventListener("click", proceedToNextRound);
        document.addEventListener("keydown", spacebarListener);
    }
}


function updateScore() {
    const itemsShown = document.querySelector('.items-shown');
    const correctAns = document.querySelector('.correct-ans');
    const resultBox = document.getElementById('result');
    
    // Increment the number of rounds played
    itemsShown.textContent = parseInt(itemsShown.textContent) + 1;
    
    // Check if the result box contains "✔ Correct" and increment correct answers if true
    if (resultBox.textContent.trim() === "✔ Correct") {
        correctAns.textContent = parseInt(correctAns.textContent) + 1;
    }
}

// Function to reset and move to the next round
function nextRound() {
    updateScore();

    /* 
    const infoBox = document.querySelector('.info-text'); // Selecting the info box
    infoBox.style.opacity = "0";
    */

    const resultBox = document.getElementById('result');
    resultBox.style.display = 'none';

    currentRiver = getRandomRiver(); // Get a new random river
    document.getElementById('header').textContent = "" + currentRiver.split("(")[0].trim();
}
