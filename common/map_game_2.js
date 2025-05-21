  
if (/iPhone|iPad/.test(navigator.userAgent)) {
    document.addEventListener("touchstart", function(event) {
        if (event.touches.length > 1) {
            event.preventDefault(); // Prevent double-tap zoom
        }
    }, { passive: false });
}



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


// Check if 'selection' parameter is 'wld_1'
if (getUrlParameter('selection').includes('wld')) {
    map.setView([0, 0], 2); // Center at (0,0) with zoom level 2
    map.setMaxZoom(6.3);

    // Remove existing image layers
    document.querySelectorAll('.leaflet-image-layer.leaflet-zoom-animated, .leaflet-tile-container.leaflet-zoom-animated').forEach(layer => {
        layer.remove();
    });

    // Add the tile layer
    tileLayer = L.tileLayer('../Map_Images/map_tiles/{z}_{x}_{y}.png', {
        attribution: '&copy; CARTO'
    }).addTo(map);

    themeStylesheet.setAttribute("href", "theme4.css");

    // Set opacity to 0 with !important
    const style = document.createElement("style");
    style.innerHTML = ".leaflet-image-layer.leaflet-zoom-animated { opacity: 0 !important; }";
    document.head.appendChild(style);
}






let isShiftHeld = false;

document.addEventListener("keydown", (event) => {
    if (event.key === "Shift") {
        isShiftHeld = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "Shift") {
        isShiftHeld = false;

        // Close all tooltips when Shift is released
        
        

        setTimeout(() => {
            document.querySelectorAll('.selected-tooltip').forEach(tooltip => {
                tooltip.remove();
            });
        }, 1600);
    }
});



let isAltHeld = false;

document.addEventListener("keydown", (event) => {
    if (event.key === "Alt") {
        isAltHeld = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "Alt") {
        isAltHeld = false;
    

    setTimeout(() => {
        document.querySelectorAll('.selected-tooltip').forEach(tooltip => {
            tooltip.remove();
        });
    }, 2600);

    }
});

// Function to handle Alt + Click for persistent hover effect
document.addEventListener("click", (event) => {
    if (isAltHeld && event.target.classList.contains("leaflet-interactive")) {
        event.target.classList.toggle("persistent-hover"); // Toggle persistent hover class
    }
});




// Function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
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



var selectedPath = null; // Track the selected path
var correctPath = null; // Track the correct path
var paths = {}; // Store paths by location name

// Loop through locations data and add them to the map

let index = 1;
for (const river in mapData) {
    const parsedGeometry = parseGeometry(mapData[river]);

    if (!parsedGeometry) continue;

    if (Array.isArray(parsedGeometry)) {
        parsedGeometry.forEach(geo => addGeometryToMap(geo, river, index));
    } else {
        addGeometryToMap(parsedGeometry, river, index);
    }

    index++;
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

 

        // Display a tooltip with the river name when clicked, and close the previous tooltip
        layer.on('click', function (e) {
            layer.bindTooltip(river, { permanent: true, className: 'selected-tooltip' }).openTooltip();

            // Close any previously opened tooltip
            if (!isShiftHeld && !isAltHeld) {
        setTimeout(() => {
            layer.closeTooltip();
        }, 1600);
    } // Adjust timeout for how long the tooltip stays visible
        });



    } else if (geometry.type === 'LineString') {
        let className = geometry.isPolygonBoundary ? 'polygon_leaflet' : 'line_leaflet'; // Check flag
    
        layer = L.polyline(geometry.coordinates, {
            color: '#EDC1A0',
            weight: 3,
            opacity: 1,
            className: className  // Apply correct class
        }).addTo(map);
    

        // Display a tooltip with the river name when clicked, and close the previous tooltip
        layer.on('click', function (e) {
            layer.bindTooltip(river, { permanent: true, className: 'selected-tooltip' }).openTooltip();

            // Close any previously opened tooltip
            if (!isShiftHeld && !isAltHeld) {
                setTimeout(() => {
                    layer.closeTooltip();
                }, 1600);
            } // Adjust timeout for how long the tooltip stays visible
        });


    } 

    if (layer) {
        paths[river] = layer;

        layer.on('mouseover', () => layer.setStyle({ color: '#D2D2D2' }));
        layer.on('mouseout', () => layer.setStyle({ color: '#EDC1A0' }));
        layer.on('click', (e) => handleSelection(river, layer, e));
    }
}