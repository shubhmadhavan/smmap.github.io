// map toggler (show or hide map using the eye icon on top right)
    // Wait for the DOM to load
    document.addEventListener('DOMContentLoaded', () => {
        const toggleMapElement = document.querySelector('.toggle-map');
        let isToggled = false; // To track the toggle state
    
        if (toggleMapElement) {
            toggleMapElement.addEventListener('click', () => {
                // Select elements by class
                const mapLayers = document.querySelectorAll('.leaflet-image-layer, .leaflet-tile-container, .leaflet-pane.leaflet-tile-pane');

    
                // Toggle opacity values based on the state
                if (isToggled) {
                    mapLayers.forEach(layer => {
                        layer.style.setProperty("opacity", "1", "important");
                    });
                    toggleMapElement.style.setProperty("opacity", "1", "important");
                } else {
                    mapLayers.forEach(layer => {
                        layer.style.setProperty("opacity", "0", "important");
                    });
                    toggleMapElement.style.setProperty("opacity", "0.4", "important");
                }
    
                // Update toggle state
                isToggled = !isToggled;
            });
        } else {
            console.error("Element with class 'toggle-map' not found.");
        }
    });