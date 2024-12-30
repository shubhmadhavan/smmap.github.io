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
    
    if (type === "POLYGON") {
        geometry = geometry.replace(/\(/, '').replace(/\)/, '');
        console.log('geo ' + geometry);
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
        console.log('Polygon' + points);
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

// Loop through river data and add them to the map
for (const river in mapData) {
    const geometry = parseGeometry(mapData[river]);

    if (geometry.type === 'Point') {
        // Add a circle marker for Point
        const marker = L.circleMarker(geometry.coordinates, {
            radius: 5,
            color: '#FF9B50',
            stroke: '#FF9B50',
            weight: 2,
            fillColor: '#FF9B50',
            fillOpacity: 1
        }).addTo(map);

        marker.on('mouseover', function () {
            marker.setStyle({ fillColor: '#D2D2D2' });
        });

        marker.on('mouseout', function () {
            marker.setStyle({ fillColor: '#FF9B50' });
        });

        // Display a tooltip with the river name when clicked, and close the previous tooltip
        marker.on('click', function (e) {
            marker.bindTooltip(river, { permanent: true, className: 'selected-tooltip' }).openTooltip();

            // Close any previously opened tooltip
            setTimeout(() => {
                marker.closeTooltip();
            }, 1100); // Adjust timeout for how long the tooltip stays visible
        });
    } else if (geometry.type === 'LineString') {
        // Add a polyline for LineString
        const polyline = L.polyline(geometry.coordinates, {
            color: '#FF9B50',
            weight: 3,
            opacity: 1
        }).addTo(map);

        polyline.on('mouseover', function () {
            polyline.setStyle({ color: '#D2D2D2' });
        });

        polyline.on('mouseout', function () {
            polyline.setStyle({ color: '#FF9B50' });
        });

        // Display a tooltip with the river name when clicked, and close the previous tooltip
        polyline.on('click', function (e) {
            polyline.bindTooltip(river, { permanent: true, className: 'selected-tooltip' }).openTooltip();

            // Close any previously opened tooltip
            setTimeout(() => {
                polyline.closeTooltip();
            }, 1100); // Adjust timeout for how long the tooltip stays visible
        });
    }
}
