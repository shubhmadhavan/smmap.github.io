
// Get the 'selection' URL parameter
const urlParams = new URLSearchParams(window.location.search);
const selection = urlParams.get('selection');

// Define a variable to hold the script and CSS path
let scriptPath = '';
let cssPath = '';

// Define a mapping of selections to script and CSS paths
const resourcesMap = {
    'riv_1': { script: '../Map_Geography/Map_Rivers/map_data.js', css: '../Map_Geography/Map_Rivers/location_color.css' },
    'mt_1': { script: '../Map_Geography/Map_Mountains/map_data.js', css: '../Map_Geography/Map_Mountains/location_color.css' },
    'gl_1':{ script: '../Map_Geography/Map_Glaciers/map_data.js', css: '../Map_Geography/Map_Glaciers/location_color.css' },
    'wf_1': { script: '../Map_Geography/Map_Waterfalls/map_data.js', css: '../Map_Geography/Map_Waterfalls/location_color.css' },
    'wld_1': { script: '../Map_Geography/Map_World/map_data.js', css: '../Map_Geography/Map_World/location_color.css' },
    'wld_2': { script: '../Map_Geography/Map_World_Latitudes/map_data.js', css: '../Map_Geography/Map_World_Latitudes/location_color.css' },
    'paint': { script: '../Map_Geography/Map_Paint_India/map_data.js', css: '../Map_Geography/Map_Paint_India/location_color.css' },
    'wld_3': { script: '../Map_Geography/Map_World_Mountains_Fold/map_data.js', css: '../Map_Geography/Map_World_Mountains_Fold/location_color.css' },
    'wld_4': { script: '../Map_Geography/Map_World_Mountains_Block/map_data.js', css: '../Map_Geography/Map_World_Mountains_Block/location_color.css' },
    'wld_5': { script: '../Map_Geography/Map_World_Rivers/map_data.js', css: '../Map_Geography/Map_World_Rivers/location_color.css' },
    'wld_6': { script: '../Map_Geography/Map_World_Seas/map_data.js', css: '../Map_Geography/Map_World_Seas/location_color.css' },
    'wld_7': { script: '../Map_Geography/Map_World_Rivers/map_data.js', css: '../Map_Geography/Map_World_Rivers/location_color.css' },
    'wld_8': { script: '../Map_Geography/Map_World_Conflicts/map_data.js', css: '../Map_Geography/Map_World_Conflicts/location_color.css' },
   

    'wld_lakes': { script: '../Map_Geography/Map_Lakes/map_data.js', css: '../Map_Geography/Map_Lakes/location_color.css' },


   
   
    'dm_1': { script: '../Map_Geography/Map_Reservoirs/map_data.js', css: '../Map_Geography/Map_Reservoirs/location_color.css' },
    'rs_1': { script: '../Map_Geography/Map_Ramsar/map_data.js', css: '../Map_Geography/Map_Ramsar/location_color.css' },
    'np_1': { script: '../Map_Geography/Map_National_Park/map_data.js', css: '../Map_Geography/Map_National_Park/location_color.css' },
    'tr_1': { script: '../Map_Geography/Map_Tiger_Res/map_data.js', css: '../Map_Geography/Map_Tiger_Res/location_color.css' },
    'PreHist_1': { script: '../Map_History/Map_0.1_Palaeolithic/map_data.js', css: '../Map_History/Map_0.1_Palaeolithic/location_color.css' },
    'PreHist_2': { script: '../Map_History/Map_0.2_Mesolithic/map_data.js', css: '../Map_History/Map_0.2_Mesolithic/location_color.css' },
    'PreHist_3': { script: '../Map_History/Map_0.3_Neolithic/map_data.js', css: '../Map_History/Map_0.3_Neolithic/location_color.css' },
    'PreHist_4': { script: '../Map_History/Map_0.4_Chalcolithic_Sites/map_data.js', css: '../Map_History/Map_0.4_Chalcolithic_Sites/location_color.css' },
    'AncHist_1': { script: '../Map_History/Map_1.1_Harappa/map_data.js', css: '../Map_History/Map_1.1_Harappa/location_color.css' },
    'AncHist_2': { script: '../Map_History/Map_1.2_Mahajanapadas/map_data.js', css: '../Map_History/Map_1.2_Mahajanapadas/location_color.css' },
    'AncHist_3': { script: '../Map_History/Map_1.3_Ashokan_Edicts/map_data.js', css: '../Map_History/Map_1.3_Ashokan_Edicts/location_color.css' },
    'AncHist_4': { script: '../Map_History/Map_1.4_Ancient_Ports/map_data.js', css: '../Map_History/Map_1.4_Ancient_Ports/location_color.css' },
    'AncHist_5': { script: '../Map_History/Map_1.5_Bhakti/map_data.js', css: '../Map_History/Map_1.5_Bhakti/location_color.css' },  
    'AncHist_6': { script: '../Map_History/Map_1.6_UNESCO/map_data.js', css: '../Map_History/Map_1.6_UNESCO/location_color.css' },  
    'Por_1': { script: '../Map_History/Map_3.1_Portuguese/map_data.js', css: '../Map_History/Map_3.1_Portuguese/location_color.css' },
    'Dutch_1': { script: '../Map_History/Map_3.2_Dutch/map_data.js', css: '../Map_History/Map_3.2_Dutch/location_color.css' },
    'Eng_1': { script: '../Map_History/Map_3.3_English/map_data.js', css: '../Map_History/Map_3.3_English/location_color.css' },
    'Dan_1': { script: '../Map_History/Map_3.3_Danish/map_data.js', css: '../Map_History/Map_3.3_Danish/location_color.css' },
    'Fra_1': { script: '../Map_History/Map_3.4_French/map_data.js', css: '../Map_History/Map_3.4_French/location_color.css' },

    'Civil_Revolts': { script: '../Map_History/Map_1760_Civil/map_data.js', css: '../Map_History/Map_1760_Civil/location_color.css' },
    'Peasant_Revolts': { script: '../Map_History/Map_1825_Peasants/map_data.js', css: '../Map_History/Map_1825_Peasants/location_color.css' },
    'Tribal_Revolts': { script: '../Map_History/Map_1768_Tribals/map_data.js', css: '../Map_History/Map_1768_Tribals/location_color.css' },
    'Tribal_Revolts–NER': { script: '../Map_History/Map_1833_Tribals–NER/map_data.js', css: '../Map_History/Map_1833_Tribals–NER/location_color.css' },
    'Sepoys': { script: '../Map_History/Map_1764_Sepoys/map_data.js', css: '../Map_History/Map_1764_Sepoys/location_color.css' },
    '1857': { script: '../Map_History/Map_1857/map_data.js', css: '../Map_History/Map_1857/location_color.css' },


    'min_1': { script: '../Map_Economy/Map_1.1_Iron_Ore/map_data.js', css: '../Map_Economy/Map_1.1_Iron_Ore/location_color.css' },
    'min_1_1': { script: '../Map_Economy/Map_1.11_Iron_Steel_Indus/map_data.js', css: '../Map_Economy/Map_1.11_Iron_Steel_Indus/location_color.css' },
    'min_2': { script: '../Map_Economy/Map_1.2_Manganese/map_data.js', css: '../Map_Economy/Map_1.2_Manganese/location_color.css' },
    'min_3': { script: '../Map_Economy/Map_1.3_Bauxite/map_data.js', css: '../Map_Economy/Map_1.3_Bauxite/location_color.css' },
    'min_4': { script: '../Map_Economy/Map_1.4_Mica/map_data.js', css: '../Map_Economy/Map_1.4_Mica/location_color.css' },
    'erg_1': { script: '../Map_Economy/Map_2.1_Coal/map_data.js', css: '../Map_Economy/Map_2.1_Coal/location_color.css' },
    'erg_2': { script: '../Map_Economy/Map_2.2_Oil_Fields/map_data.js', css: '../Map_Economy/Map_2.2_Oil_Fields/location_color.css' },
    'erg_3': { script: '../Map_Economy/Map_2.3_Natural_Gas/map_data.js', css: '../Map_Economy/Map_2.3_Natural_Gas/location_color.css' },
    'erg_4': { script: '../Map_Economy/Map_3.1_NPP/map_data.js', css: '../Map_Economy/Map_3.1_NPP/location_color.css' },
    'Ports_1': { script: '../Map_Economy/Map_3.2_Ports/map_data.js', css: '../Map_Economy/Map_3.2_Ports/location_color.css' },
    'air_1': { script: '../Map_Economy/Map_3.5_Airports/map_data.js', css: '../Map_Economy/Map_3.5_Airports/location_color.css' }
};

// Check if the selection is valid and assign the appropriate script and CSS paths
const resources = resourcesMap[selection] || null;

if (resources) {
    // Dynamically load the CSS file
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = resources.css;
    document.head.appendChild(link);

    // Dynamically load the map_data.js script
    const script = document.createElement('script');
    script.src = resources.script;
    
    script.onload = function() {
    const currentPage = window.location.pathname;

    let gameScriptName = '';

    if (currentPage.includes('Map_Game_2_dark.html')) {
        gameScriptName = 'map_game_2.js';
    } else if (currentPage.includes('Map_Game_dark.html')) {
        gameScriptName = 'map_game.js';
    } else {
        gameScriptName = 'map_game.js'; // fallback
    }

    const gameScript = document.createElement('script');
    gameScript.src = gameScriptName;
    document.head.appendChild(gameScript);
};

    document.head.appendChild(script); // Attach map_data.js script to the document
} else {
    console.log('Invalid or missing selection parameter');
}

