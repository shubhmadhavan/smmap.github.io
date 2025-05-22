document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = [
        { selector: '.toggle-map-1', image: '../Map_Images/India_OS_baige.jpg', 
            theme: 'themebaige.css', toggleKey: 'isToggled1', key: '2' },
        { selector: '.toggle-map-2', tile: '../Map_Images/map_tiles/{z}_{x}_{y}.png', 
            theme: 'theme4.css', toggleKey: 'isToggled2', key: '' },
        { selector: '.toggle-map-3', image: '../Map_Images/India_OS_Grey.jpg', 
            theme: 'theme3.css', toggleKey: 'isToggled3', key: '1' },
        { selector: '.toggle-map-4', image: '../Map_Images/India_OS_Green.jpg', 
            theme: 'theme2.css', toggleKey: 'isToggled4', key: '3' },
        { selector: '.toggle-map-5', image: '../Map_Images/India_OS_Blue.jpg', 
            theme: 'theme3.css', toggleKey: 'isToggled5', key: '' }
    ];

    let activeToggle = null;
    let tileLayer = null;
    let imageOverlay = null;
    const buttonMap = {};

    function clearMapLayers() {
        if (tileLayer) {
            map.removeLayer(tileLayer);
            tileLayer = null;
        }
        if (imageOverlay) {
            map.removeLayer(imageOverlay);
            imageOverlay = null;
        }
    }

    function handleToggle(config) {
        const isActive = activeToggle === config.toggleKey;

        clearMapLayers();

        if (!isActive) {
            if (config.tile) {
                tileLayer = L.tileLayer(config.tile, {
                    attribution: '&copy; CARTO',
                    minZoom: 1,
                    maxZoom: 8,
                    maxNativeZoom: 6,
                    tileSize: 256
                }).addTo(map);
            } else if (config.image) {
                imageOverlay = L.imageOverlay(config.image, imageBounds).addTo(map);
            }

            themeStylesheet.setAttribute('href', config.theme);
            activeToggle = config.toggleKey;
        } else {
            imageOverlay = L.imageOverlay('../Map_Images/India_OS_dark.jpg', imageBounds).addTo(map);
            themeStylesheet.setAttribute('href', 'theme1.css');
            activeToggle = null;
        }
    }

    toggleButtons.forEach(config => {
        const button = document.querySelector(config.selector);
        if (button) {
            buttonMap[config.key] = config; // map key to config
            button.addEventListener('click', () => handleToggle(config));
        } else {
            console.error(`Element with class '${config.selector.slice(1)}' not found.`);
        }
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (buttonMap[key]) {
            handleToggle(buttonMap[key]);
        }
    });
});
