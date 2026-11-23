/* =========================================================================
   SM-Map registry + resource loader
   -------------------------------------------------------------------------
   One entry per map:  selection-key: [folder, title, flags]
   Each folder holds  map_data.js  (const mapData = {...})
                 and  location_color.css
   flags: "draft" = not linked from the hub pages yet (skipped by rng.html)

   To add a map: create the folder, add one line here, add a card to an
   index-N.html page. Nothing else needs to change.
   ========================================================================= */
var SM_MAPS = {
  // Indian Geography
  "riv_1":   ["Map_Geography/Map_Rivers", "Rivers"],
  "dm_1":    ["Map_Geography/Map_Reservoirs", "Reservoirs & Dams"],
  "wf_1":    ["Map_Geography/Map_Waterfalls", "Waterfalls"],
  "gl_1":    ["Map_Geography/Map_Glaciers", "Glaciers"],
  "np_1":    ["Map_Geography/Map_National_Park", "National Parks"],
  "tr_1":    ["Map_Geography/Map_Tiger_Res", "Tiger Reserves"],
  "rs_1":    ["Map_Geography/Map_Ramsar", "Ramsar Sites"],
  "mt_1":    ["Map_Geography/Map_Mountains", "Mountains"],
  "mt_2":    ["Map_Geography/Map_Passes", "Passes"],
  "tribes":  ["Map_Geography/Map_Tribes", "Tribes"],
  "paint":   ["Map_Geography/Map_Paint_India", "Paint India"],

  // World Geography (keys containing "wld" use the world tile map)
  "wld_1":     ["Map_Geography/Map_World", "Countries"],
  "wld_2":     ["Map_Geography/Map_World_Latitudes", "Major Coordinates"],
  "wld_orgs":  ["Map_Geography/Map_World_Orgs", "Organisation HQs"],
  "wld_5":     ["Map_Geography/Map_World_Rivers", "Rivers of the World"],
  "wld_6":     ["Map_Geography/Map_World_Seas", "Seas"],
  "wld_lakes": ["Map_Geography/Map_World_Lakes", "Lakes"],
  "wld_3":     ["Map_Geography/Map_World_Mountains_Fold", "Fold Mountains"],
  "wld_4":     ["Map_Geography/Map_World_Mountains_Block", "Block Mountains"],
  "wld_7":     ["Map_Geography/Map_World_Rivers", "Ocean Currents", "draft"],
  "wld_8":     ["Map_Geography/Map_World_Conflicts", "Conflict Zones", "draft"],

  // Resources & Infra
  "coal":        ["Map_Economy/Map_2.1_Coal", "Coal"],
  "crude":       ["Map_Economy/Map_2.2_Oil_Fields", "Oil Fields (Crude)"],
  "natural_gas": ["Map_Economy/Map_2.3_Natural_Gas", "Natural Gas"],
  "iron":        ["Map_Economy/Map_1.1_Iron_Ore", "Iron Ore"],
  "iron_steel":  ["Map_Economy/Map_1.11_Iron_Steel_Indus", "Iron & Steel Industries"],
  "manganese":   ["Map_Economy/Map_1.2_Manganese", "Manganese"],
  "bauxite":     ["Map_Economy/Map_1.3_Bauxite", "Bauxite"],
  "mica":        ["Map_Economy/Map_1.4_Mica", "Mica"],
  "nuclear":     ["Map_Economy/Map_3.1_NPP", "Nuclear Power Plants"],
  "ports":       ["Map_Economy/Map_3.2_Ports", "Ports"],
  "airports":    ["Map_Economy/Map_3.5_Airports", "Airports (UDAN)"],

  // Ancient & Medieval History
  "Palaeolithic": ["Map_History/Map_0.1_Palaeolithic", "Palaeolithic"],
  "Mesolithic":   ["Map_History/Map_0.2_Mesolithic", "Mesolithic"],
  "Neolithic":    ["Map_History/Map_0.3_Neolithic", "Neolithic"],
  "Chalcolithic": ["Map_History/Map_0.4_Chalcolithic_Sites", "Chalcolithic"],
  "AncHist_1":    ["Map_History/Map_1.1_Harappa", "Harappan"],
  "AncHist_2":    ["Map_History/Map_1.2_Mahajanapadas", "Mahajanapadas"],
  "AncHist_2.1":  ["Map_History/Map_1.2_Ancient_Rivers", "Ancient Rivers"],
  "AncHist_3":    ["Map_History/Map_1.3_Ashokan_Edicts", "Ashokan Edicts"],
  "AncHist_4":    ["Map_History/Map_1.4_Ancient_Ports", "Ancient Ports"],
  "AncHist_5":    ["Map_History/Map_1.5_Bhakti", "Bhakti Saints"],
  "AncHist_6":    ["Map_History/Map_1.6_UNESCO", "UNESCO WHS"],

  // Modern History
  "Por_1":   ["Map_History/Map_3.1_Portuguese", "Portuguese (1500)"],
  "Dutch_1": ["Map_History/Map_3.2_Dutch", "Dutch (1605)"],
  "Eng_1":   ["Map_History/Map_3.3_English", "English (1612)"],
  "Dan_1":   ["Map_History/Map_3.3_Danish", "Danes (1620)"],
  "Fra_1":   ["Map_History/Map_3.4_French", "French (1667)"],
  "Civil_Revolts":      ["Map_History/Map_1760_Civil", "Civil Revolts"],
  "Peasant_Revolts":    ["Map_History/Map_1825_Peasants", "Peasant Revolts"],
  "Tribal_Revolts":     ["Map_History/Map_1768_Tribals", "Tribal Revolts"],
  "Tribal_Revolts–NER": ["Map_History/Map_1833_Tribals–NER", "Tribal Revolts – NER"],
  "Sepoys":             ["Map_History/Map_1764_Sepoys", "Sepoy Mutinies (before 1857)"],
  "1857":               ["Map_History/Map_1857", "Great Revolt of 1857"]
};

/* -------------------------------------------------------------------------
   Loader. Runs synchronously from <head> so the map's colours and data start
   downloading in parallel with Leaflet, before the page has finished parsing.
   Exposes SM_BOOT = { key, title, world, ready: Promise }.
   Pages without a map (e.g. rng.html) set  window.SM_NO_LOAD = true  first.
   ------------------------------------------------------------------------- */
var SM_BOOT = (function () {
  if (window.SM_NO_LOAD) return null;

  var key = new URLSearchParams(location.search).get('selection') || '';
  var entry = SM_MAPS[key];
  var boot = { key: key, title: entry ? entry[1] : '', world: key.indexOf('wld') !== -1, ready: null };

  // Apply the saved theme before first paint (avoids a flash of theme1)
  try {
    var saved = { isToggled1: 'themebaige.css', isToggled3: 'theme1.css', isToggled4: 'theme2.css' }[localStorage.getItem('activeTheme')];
    var themeLink = document.getElementById('themeStylesheet');
    if (saved && themeLink) themeLink.setAttribute('href', saved);
  } catch (e) { /* storage blocked: keep default */ }

  if (!entry) {
    boot.ready = Promise.reject(new Error('Unknown map: "' + key + '"'));
    boot.ready.catch(function () {});
    return boot;
  }

  document.title = entry[1] + ' · SM-Map';

  var css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = '../' + entry[0] + '/location_color.css';
  document.head.appendChild(css);

  boot.ready = new Promise(function (resolve, reject) {
    var s = document.createElement('script');
    s.src = '../' + entry[0] + '/map_data.js';
    s.onload = resolve;
    s.onerror = function () { reject(new Error('Could not load ' + s.src)); };
    document.head.appendChild(s);
  });
  boot.ready.catch(function () {});
  return boot;
})();
