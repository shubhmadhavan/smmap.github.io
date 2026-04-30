document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = [
        { selector: '.toggle-map-1', image: '../Map_Images/India_OS_baige.jpg', theme: 'themebaige.css', toggleKey: 'isToggled1', key: '3' },
        { selector: '.toggle-map-3', image: '../Map_Images/India_OS_Grey.jpg', theme: 'theme3.css', toggleKey: 'isToggled3', key: '1' },
        { selector: '.toggle-map-4', image: '../Map_Images/India_OS_Green.jpg', theme: 'theme2.css', toggleKey: 'isToggled4', key: '2' }
        
        /*,

        { selector: '.toggle-map-2', tile: '../Map_Images/map_tiles/{z}_{x}_{y}.png', theme: 'theme4.css', toggleKey: 'isToggled2', key: '4' },

        { selector: '.toggle-map-5', image: '../Map_Images/India_OS_Blue.jpg', theme: 'theme3.css', toggleKey: 'isToggled5', key: '5' }
   */
   
    ];

    let activeToggle = null;
    let tileLayer = null;
    let imageOverlay = null;
    const buttonMap = {};
    const STORAGE_KEY = 'activeTheme';

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

    function applyDefault(skipSave = false) {
        clearMapLayers();

        imageOverlay = L.imageOverlay('../Map_Images/India_OS_dark.jpg', imageBounds).addTo(map);
        themeStylesheet.setAttribute('href', 'theme1.css');
        activeToggle = null;

        if (!skipSave) {
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    function handleToggle(config, skipSave = false) {
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

            if (!skipSave) {
                localStorage.setItem(STORAGE_KEY, config.toggleKey);
            }

        } else {
            applyDefault(skipSave);
        }
    }

    // Map buttons
    toggleButtons.forEach(config => {
        const button = document.querySelector(config.selector);
        if (button) {
            if (config.key) {
                buttonMap[config.key] = config;
            }
            button.addEventListener('click', () => handleToggle(config));
        }
    });

        // Keyboard shortcuts
        document.addEventListener('keydown', (event) => {
            const key = event.key;

            if (event.metaKey || event.altKey || event.ctrlKey) {

                // ✅ Ctrl + 4 → force default
                if (key === '4') {
                    event.preventDefault();
                    applyDefault();
                    return;
                }

                if (buttonMap[key]) {
                    event.preventDefault();
                    handleToggle(buttonMap[key]);
                }
            }
        });

    // 🔥 FORCE RESTORE AFTER EVERYTHING (fixes your issue)
    window.addEventListener('load', () => {
        const savedToggle = localStorage.getItem(STORAGE_KEY);

        if (savedToggle) {
            const config = toggleButtons.find(t => t.toggleKey === savedToggle);

            if (config) {
                handleToggle(config, true);
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        } else {
            applyDefault(true);
        }
    });

    

    // 🧠 DEFENSE: Re-apply if some other script overrides theme
    const observer = new MutationObserver(() => {
        const savedToggle = localStorage.getItem(STORAGE_KEY);

        if (savedToggle && activeToggle !== savedToggle) {
            const config = toggleButtons.find(t => t.toggleKey === savedToggle);
            if (config) {
                handleToggle(config, true);
            }
        }
    });

    observer.observe(document.head, { childList: true, subtree: true });
});

