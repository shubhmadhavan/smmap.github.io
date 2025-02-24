

// Initialize the map
var map = L.map('map', {
    doubleClickZoom: false // Disable double click to zoom
}).setView([20.5937, 80.9629], 5); // Set to India center

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


// Function to parse different geometry types
function parseGeometry(geometry) {
    const type = geometry.split(' ')[0];
	
	if (type === "POLYGON"){
		geometry = geometry.replace(/\(/, '').replace(/\)/, '');
		console.log('geo '+geometry);
	}
	
	const coords = geometry.replace(type, '').trim().slice(1, -1).split(', ');


	console.log(coords);


    if (type === "POINT") {
        const [lon, lat] = coords[0].split(' ');
        return { type: 'Point', coordinates: [parseFloat(lat), parseFloat(lon)] };
    } else if (type === "POLYGON") {
        const points = coords.map(coord => {
			coords.slice(1, -1);
            const [lon, lat] = coord.split(' ');
            return [parseFloat(lat), parseFloat(lon)];
        });
		console.log('Polygon'+points);
        return { type: 'LineString', coordinates: points };
    } else if (type === "LINESTRING") {
        const points = coords.map(coord => {
            const [lon, lat] = coord.split(' ');
            return [parseFloat(lat), parseFloat(lon)];
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
    const geometry = parseGeometry(mapData[river]);

    if (geometry.type === 'Point') {
        // Add a circle marker for Point
        const marker = L.circleMarker(geometry.coordinates, {
            radius: 5,
            color: '#EDC1A0',
			stroke: '',
            weight: 2,
            fillColor: '#FF9B50',
            fillOpacity: 1
        }).addTo(map);
        paths[river] = marker;

        marker.on('mouseover', function () {
            marker.setStyle({ fillColor: '#D2D2D2' });
        });

        marker.on('mouseout', function () {
            marker.setStyle({ fillColor: '#FF9B50' });
        });

        marker.on('click', function (e) {
            handleSelection(river, marker, e);
        });



    } else if (geometry.type === 'LineString') {
        // Add a polyline for LineString
        const polyline = L.polyline(geometry.coordinates, {
            color: '#EDC1A0',
            weight: 3,
            opacity: 1
        }).addTo(map);
        paths[river] = polyline;

        polyline.on('mouseover', function () {
            polyline.setStyle({ color: '#D2D2D2' });
        });

        polyline.on('mouseout', function () {
            polyline.setStyle({ color: '#EDC1A0' });
        });

        polyline.on('click', function (e) {
            handleSelection(river, polyline, e);
        });
    }
}

// Function to handle location selection
function handleSelection(river, path, event) {
    const resultBox = document.getElementById('result');
	const correctPath = paths[currentRiver];
	path.bindTooltip(river, { permanent: true, className: 'selected-tooltip' }).openTooltip();

    if (river === currentRiver) {
        // Correct location selected
        //path.setStyle({ color: '#00FFF0' });
        resultBox.textContent = "✔ Correct";
        resultBox.style.backgroundColor = "#029193";
    } else {
        // Incorrect location selected
        //path.setStyle({ color: '#894545' });
        resultBox.textContent = "✘ Incorrect";
        resultBox.style.backgroundColor = "#894545";

        // Highlight the correct location
        
        if (correctPath) {
            //correctPath.setStyle({ color: '#00FFF0' });
			correctPath.bindTooltip(currentRiver, { permanent: true, className: 'correct-tooltip' }).openTooltip();
        }
    }

    resultBox.style.display = 'block';

    // Move to the next round after a delay
    // timeout code part 2
    setTimeout(function () {
		path.closeTooltip();
		if (correctPath) {
			correctPath.closeTooltip();
		}
        nextRound();
    }, timeoutDuration); // timeout code part 2 ends
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
    const resultBox = document.getElementById('result');
    resultBox.style.display = 'none';

    currentRiver = getRandomRiver(); // Get a new random river
    document.getElementById('header').textContent = "" + currentRiver.split("(")[0].trim();
}
