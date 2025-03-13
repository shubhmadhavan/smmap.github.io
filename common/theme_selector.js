 // theme selector
 document.addEventListener('DOMContentLoaded', () => {
    const leafletContainer = document.querySelector(".leaflet-container");
    const toggleMap2Element = document.querySelector('.toggle-map-2');
    const toggleMap3Element = document.querySelector('.toggle-map-3');
    const toggleMap4Element = document.querySelector('.toggle-map-4');
    const toggleMap5Element = document.querySelector('.toggle-map-5');
    let isToggled2 = false; // Toggle state for .toggle-map-2
    let isToggled3 = false; // Toggle state for .toggle-map-3
    let isToggled4 = false; // Toggle state for .toggle-map-4
    let isToggled5 = false; // Toggle state for .toggle-map-5


    let tileLayer, imageOverlay;

if (toggleMap2Element) {
    toggleMap2Element.addEventListener('click', () => {
        if (isToggled2) {
            // Remove the image overlay if it exists
            document.querySelectorAll('.leaflet-image-layer.leaflet-zoom-animated').forEach(layer => {
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
            
        } else {
            // Remove the tile layer if it exists
            if (tileLayer) {
                map.removeLayer(tileLayer);
                tileLayer = null;
            }
            
            // Add the image overlay
            imageOverlay = L.imageOverlay('../Map_Images/India_OS_dark.jpg', imageBounds).addTo(map);
            themeStylesheet.setAttribute("href", "theme1.css");
        }
        
        isToggled2 = !isToggled2;
        isToggled3 = false; // Reset toggle for .toggle-map-3
    });
}
 else {
        console.error("Element with class 'toggle-map-2' not found.");
    }

    if (toggleMap3Element) {
        toggleMap3Element.addEventListener('click', () => {
            if (isToggled3) {
                if (tileLayer) {
                    map.removeLayer(tileLayer);
                    tileLayer = null;
                }
                L.imageOverlay('../Map_Images/India_OS_Grey.jpg', imageBounds).addTo(map);
                themeStylesheet.setAttribute("href", "theme3.css");

            } else {
                if (tileLayer) {
                    map.removeLayer(tileLayer);
                    tileLayer = null;
                }
                L.imageOverlay('../Map_Images/India_OS_dark.jpg', imageBounds).addTo(map);
                themeStylesheet.setAttribute("href", "theme1.css");
            }
            isToggled3 = !isToggled3;
            isToggled2 = false; // Reset toggle for .toggle-map-2
        });
    } else {
        console.error("Element with class 'toggle-map-3' not found.");
    }
    
    if (toggleMap4Element) {
        toggleMap4Element.addEventListener('click', () => {
            if (isToggled4) {
                if (tileLayer) {
                    map.removeLayer(tileLayer);
                    tileLayer = null;
                }
                L.imageOverlay('../Map_Images/India_OS_Green.jpg', imageBounds).addTo(map);
                themeStylesheet.setAttribute("href", "theme2.css");
            } else {
                if (tileLayer) {
                    map.removeLayer(tileLayer);
                    tileLayer = null;
                }
                L.imageOverlay('../Map_Images/India_OS_dark.jpg', imageBounds).addTo(map);
                themeStylesheet.setAttribute("href", "theme1.css");
            }
            isToggled4 = !isToggled4;
            isToggled2 = false; // Reset toggle for .toggle-map-2
        });
    } else {
        console.error("Element with class 'toggle-map-4' not found.");
    }
    
    if (toggleMap5Element) {
        toggleMap5Element.addEventListener('click', () => {
            if (isToggled5) {
                if (tileLayer) {
                    map.removeLayer(tileLayer);
                    tileLayer = null;
                }
                L.imageOverlay('../Map_Images/India_OS_Blue.jpg', imageBounds).addTo(map);
                themeStylesheet.setAttribute("href", "theme3.css");
            } else {
                if (tileLayer) {
                    map.removeLayer(tileLayer);
                    tileLayer = null;
                }
                L.imageOverlay('../Map_Images/India_OS_dark.jpg', imageBounds).addTo(map);
                themeStylesheet.setAttribute("href", "theme1.css");
            }
            isToggled5 = !isToggled5;
            isToggled2 = false; // Reset toggle for .toggle-map-2
        });
    } else {
        console.error("Element with class 'toggle-map-5' not found.");
    }
});