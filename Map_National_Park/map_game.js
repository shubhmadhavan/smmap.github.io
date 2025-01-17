// Initialize the map
var map = L.map('map', {
    doubleClickZoom: false // Disable double click to zoom
}).setView([20.5937, 80.9629], 5); // Set to India center

// Define the bounds of the image (set these to match the geographical area of the image)
var imageBounds = [[-2.0, 36.78], 
				  [41.33, 121.216]];  // Latitude/Longitude for the image corners

// Add the local image as an overlay to the map
L.imageOverlay('../Map_Images/India_OS_dark.jpg', imageBounds).addTo(map);

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
function getRandomRiver() {
    const rivers = Object.keys(mapData);
    const randomIndex = Math.floor(Math.random() * rivers.length);
    return rivers[randomIndex];
}

var currentRiver = getRandomRiver(); // Initially pick a random river
document.getElementById('header').textContent = "Locate: " + currentRiver;

var selectedPath = null; // Track the selected path
var correctPath = null; // Track the correct path
var paths = {}; // Store paths by river name

// Loop through river data and add them to the map
for (const river in mapData) {
    const geometry = parseGeometry(mapData[river]);

    if (geometry.type === 'Point') {
        // Add a circle marker for Point
        const marker = L.circleMarker(geometry.coordinates, {
            radius: 5,
            color: '#EDC1A0',
			stroke: '#EDC1A0',
            weight: 2,
            fillColor: '#489855',
            fillOpacity: 1
        }).addTo(map);
        paths[river] = marker;

        marker.on('mouseover', function () {
            marker.setStyle({ fillColor: '#D2D2D2' });
        });

        marker.on('mouseout', function () {
            marker.setStyle({ fillColor: '#489855' });
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

// Function to handle river selection
function handleSelection(river, path, event) {
    const resultBox = document.getElementById('result');
	const correctPath = paths[currentRiver];
	path.bindTooltip(river, { permanent: true, className: 'selected-tooltip' }).openTooltip();

    if (river === currentRiver) {
        // Correct river selected
        //path.setStyle({ color: '#00FFF0' });
        resultBox.textContent = "✔ Correct";
        resultBox.style.backgroundColor = "#029193";
    } else {
        // Incorrect river selected
        //path.setStyle({ color: '#894545' });
        resultBox.textContent = "✘ Incorrect";
        resultBox.style.backgroundColor = "#894545";

        // Highlight the correct river
        
        if (correctPath) {
            //correctPath.setStyle({ color: '#00FFF0' });
			correctPath.bindTooltip(currentRiver, { permanent: true, className: 'correct-tooltip' }).openTooltip();
        }
    }

    resultBox.style.display = 'block';

    // Move to the next round after a delay
    setTimeout(function () {
		path.closeTooltip();
		if (correctPath) {
			correctPath.closeTooltip();
		}
        nextRound();
    }, 1400);
}

// Function to reset and move to the next round
function nextRound() {
    const resultBox = document.getElementById('result');
    resultBox.style.display = 'none';

    currentRiver = getRandomRiver(); // Get a new random river
    document.getElementById('header').textContent = "Locate: " + currentRiver;
}
