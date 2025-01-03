const map = document.getElementById('map');



const clickCoordinates = document.getElementById('click-coordinates');


const scoreLast = document.getElementById('last-score');
const scoreNb = document.getElementById('nb-score');

const scoreDist = document.getElementById('dist-score');

const scoreTotal = document.getElementById('total-score');
const scoreAverage = document.getElementById('average-score');

const scoreReset = document.getElementById("resetScore");
const targetInfo = document.getElementById('target-info');
const targetInfo2 = document.getElementById('target-info-2');
const targetInfo3 = document.getElementById('target-info-3');


let clickPoint = null;
let targetPoint = null;
let infoText = null;
let infoTextCopy = null;
let infoText2 = null; // information about site
let infoText3 = null; // image if any
let infoText4 = null; // image if any
let targetText = null;
let targetTextCopy = null;
let distanceText = null;
let randomCity = { longitude: null, latitude: null };
let citiesList = null;
let gameOngoing = false;
let citiesIt = 0; //change it ahead as well
let lastScore = 0; //Score du dernier clic
let distscore = 0;
let totalScore = 0; //Score total
let nbScore = 0; // Nombre de parties
let averageScore = 0; // Score moyen
let numberOfLinesToConsider = 2200; // Le nombre de lignes à considérer (=difficulté) 22=préféectures de région, 96=préfectures, 320=sous-préfectures, 20=défi du jour
let neverStopGame = 100000;
let isDefi = false;
let defiDate = "";
let diffText = "";

let lines2 = 0;

let scoreArray = [];
let clicHistory = [];
let textToCopy = "";
let top3 = [];
let flop3 = [];

let lang = "en";
let currentMap = maps["in"];

let orderRSNP = "RS";

// Obtenez l'URL actuelle de la page
const urlParams = new URLSearchParams(window.location.search);

// Vérifiez si le paramètre "lang" est présent dans l'URL
if (urlParams.has('lang')) {
    // Obtenez la valeur du paramètre "lang"
    const urlLang = urlParams.get('lang');
    if(urlLang == "fr" || urlLang == "en") 
	{
		lang=urlLang;
	}
	else
	{
		console.log('Unknown language => en');
	}
} else {
    console.log('No language specified in the url => en');
}

// Vérifiez si le paramètre "map" est présent dans l'URL
if (urlParams.has('map')) {
    // Obtenez la valeur du paramètre "map"
    const urlMap = urlParams.get('map');

	if (urlMap === 'rivers') {
		window.location.href = 'Map_Rivers/River_Game_dark.html';
	} else if (urlMap === 'rivers_2') {
		window.location.href = 'Map_Rivers/River_Game_2_dark.html';
	}
	
	
	if (urlMap.value === 'rivers') {
		window.location.href = 'Map_Rivers/River_Game_2_dark.html';
	} else if (urlMap.value === 'rivers_2') {
		window.location.href = 'Map_Rivers/River_Game_2_dark.html';
	}


    if(urlMap == "np" || urlMap == "in" || urlMap == "rs" || urlMap == "dm" || urlMap == "wf") // np = National Parks, rs = Ramsar Sites, dm = Dams & Reservoirs, WF = Waterfalls
	{
		currentMap=maps[urlMap];
	}
	else
	{
		console.log('Unknown map => fr');
	}
} else {
    console.log('No map specified in the url => fr');
}

if (urlParams.has('orderRSNP')) {
    // Obtenez la valeur du paramètre "map"
    const urlorderRSNP = urlParams.get('orderRSNP');
    if(urlorderRSNP == "RS" || urlorderRSNP == "NS" ) 
	{
		orderRSNP=urlorderRSNP;
	}
	else
	{
		console.log('Unknown Order');
	}
} else {
    console.log('No Order specified in the url');
}



  // Coordonnées GPS des 4 coins de l'image (à remplacer par les coordonnées réelles)
const topLeftGPS = currentMap.topLeftGPS;
const topRightGPS = currentMap.topRightGPS;
const bottomLeftGPS = currentMap.bottomLeftGPS;
const bottomRightGPS = currentMap.bottomRightGPS;
const width = currentMap.width;
const height = currentMap.height;
const offsetY = 105;

// IMage de fond
const img = new Image();
img.src = currentMap.img;

img.onload = function() {
	//drawMapBackground();
}





document.addEventListener('DOMContentLoaded', function() {
    // Code JavaScript à exécuter une fois que la page est chargée
    applyI18nToHtml(lang, "txtChallengeTitle", "txtChallenge", "defi", "txtFreePracticeTitle", "txtEasy", "txtMedium", "txtHard", "txtNbCitiesTitle", "txtCitiesAll", "startGameButton", "finish",  "txtAverageScore", "resetScore", "txtOr", "change", "txtDifficulty");
	
	document.getElementById("map-image").src = currentMap.img;
	document.getElementById("map").style.height = currentMap.height+"px";//not sufficient, to be fixed
	document.getElementById("map").style.width = currentMap.width+"px";
	
	if(lang == "fr") document.getElementById("change").style.left = "654px";
	else if(lang == "en") document.getElementById("change").style.left = "666px";
		
	const styleSheets = document.styleSheets;

	//Pour chaque feuille de style
	for (let i = 0; i < styleSheets.length; i++) {
		const styleSheet = styleSheets[i];

		// Vérifiez si la règle de style est une règle @media
		if (styleSheet.media && styleSheet.media.mediaText === 'screen and (max-width: 819px)') {
			// Parcourir les règles de style dans la feuille de style
			const rules = styleSheet.cssRules || styleSheet.rules;
			for (let j = 0; j < rules.length; j++) {
				const rule = rules[j];

				// Vérifiez si la règle cible l'élément "click-coordinates"
				if (rule.selectorText === '#click-coordinates') {
					// Modifier le top de la règle
					rule.style.top = (currentMap.height + 135)+"px"; // Nouvelle valeur
				}
			}
		}
		

	}
	
	document.title = i18n("txtTitle",lang);
	
	document.getElementById("myCanvas").height = currentMap.height;
	document.getElementById("myCanvas").width = currentMap.width;
	
	document.getElementById("txtEasy").value=currentMap.categories.easy.totalCount;
	document.getElementById("txtEasy").innerHTML=currentMap.categories.easy.difficulty;
	document.getElementById("txtMedium").value=currentMap.categories.medium.totalCount;
	document.getElementById("txtMedium").innerHTML=currentMap.categories.medium.difficulty;
	document.getElementById("txtHard").value=currentMap.categories.hard.totalCount;
	document.getElementById("txtHard").innerHTML=currentMap.categories.hard.difficulty;
	
	document.getElementById("txtScoreExplanations").innerHTML=i18n("txtScoreExplanations", lang, currentMap.categories.veryeasy.name, currentMap.categories.easy.name, currentMap.categories.medium.name, currentMap.categories.hard.name, generateScale());
	


	
	//topLeft
	//console.log(xyToGPS(0, 0-145, 800, 436, currentMap.topLeftGPS, currentMap.topRightGPS, currentMap.bottomLeftGPS, currentMap.bottomRightGPS));
	//bottomLeft
	//console.log(xyToGPS(0, 436+145, 800, 436, currentMap.topLeftGPS, currentMap.topRightGPS, currentMap.bottomLeftGPS, currentMap.bottomRightGPS));
	//topRight
	//console.log(xyToGPS(800, 0-145, 800, 436, currentMap.topLeftGPS, currentMap.topRightGPS, currentMap.bottomLeftGPS, currentMap.bottomRightGPS));
	//bottomRight
	//console.log(xyToGPS(800, 436+145, 800, 436, currentMap.topLeftGPS, currentMap.topRightGPS, currentMap.bottomLeftGPS, currentMap.bottomRightGPS));

});

defi.onclick = function() {
	startGame(true); //Défi
};

startGameButton.onclick = function() {
	startGame(false); //Pratique libre
};

scoreReset.onclick = function() {
	//Terminé
};



const themeButtons = document.querySelectorAll('.theme-button');
const themeClasses = ['target-point', 'target-text', 'target-text-copy', 'target-text-copyRight', 'info-text', 'info-text-2', 'info-text-copy', 'text-copy', 'info-box-2', 'distance-text']; // Classes to target

// Function to apply the selected theme to specified classes
function applyTheme(theme) {
	themeClasses.forEach(cls => {
		const elements = document.querySelectorAll(`.${cls}`);
		elements.forEach(element => {
			element.classList.remove('theme-default', 'theme1', 'theme2', 'theme3', 'theme4', 'theme5', 'theme6', 'theme7','theme8','theme9','theme10'); // Remove all theme classes
			element.classList.add(theme); // Add the selected theme class
		});
	});
}

// Function to check and apply the stored theme
function checkAndApplyStoredTheme() {
	const storedTheme = localStorage.getItem('selectedTheme');
	if (storedTheme) {
		applyTheme(storedTheme); // Apply stored theme on page load
	}
}

// Check for stored theme on document load
checkAndApplyStoredTheme();

// Add click event to theme buttons
themeButtons.forEach(button => {
	button.addEventListener('click', function() {
		const selectedTheme = this.getAttribute('data-theme');
		applyTheme(selectedTheme); // Apply the selected theme
		localStorage.setItem('selectedTheme', selectedTheme); // Store selected theme in localStorage
	});
});






map.addEventListener('click', function(event) {

	if (event.target.classList.contains('targetTextCopy') || 
	event.target.classList.contains('infoTextCopy') ||
	event.target.classList.contains('infoText2') ||
	event.target.classList.contains('infoText3') ||
	event.target.classList.contains('infoText4')
) {

	return; 
}



if(gameOngoing)
{
	const mapRect = map.getBoundingClientRect();
	//zoom coordinates adjustment
	const zoomFactor = 1; // Your zoom level (80%)
	const x = (event.clientX - mapRect.left) / zoomFactor;
	const y = (event.clientY - mapRect.top) / zoomFactor;
	
	console.log(`Clic - X `+x+` / Y `+y);

	// Calcul des coordonnées GPS du point cliqué
	const gpsCoordinates = xyToGPS(currentMap.projection, x, y - offsetY, width, height, topLeftGPS, topRightGPS, bottomLeftGPS, bottomRightGPS);
	console.log(`Clic - Long `+gpsCoordinates.longitude+` / Lat `+gpsCoordinates.latitude);
	
  
	//Positionnement de la cible
	console.log(`Target - Long `+randomCity.longitude+` / Lat `+randomCity.latitude);
	const imageCoordinates = gpsToXY(currentMap.projection, randomCity.latitude, randomCity.longitude, width, height, topLeftGPS, topRightGPS, bottomLeftGPS, bottomRightGPS);
	const targetX = imageCoordinates.x;
	const targetY = offsetY + imageCoordinates.y;
	console.log(`Target - X `+imageCoordinates.x+` / Y `+imageCoordinates.y);
	console.log('randomCity:', randomCity);
	//Calcul et affichage de la distance
	const distance = Math.trunc(calculateDistance(gpsCoordinates.latitude, gpsCoordinates.longitude, randomCity.latitude, randomCity.longitude));
	clickCoordinates.innerHTML = i18n("distanceFrom", lang, randomCity.cityName, randomCity.department, currentMap.categories[randomCity.type]?.name, distance);



	//Calcul du score
	coeff = coeff = currentMap.categories[randomCity.type]?.coeff;
	//if(randomCity.type == "veryeasy") coeff = currentMap.categories.veryeasy.coeff;
	//if(randomCity.type == "easy") coeff = currentMap.categories.easy.coeff;
	//if(randomCity.type == "medium") coeff = currentMap.categories.medium.coeff;
	//if(randomCity.type == "hard") coeff = currentMap.categories.hard.coeff;
	lastScore = distance;
	totalScore = totalScore + lastScore;
	nbScore = nbScore + 1;
	distscore += (distance < 200) ? 1 : 0; //Dist<200km then add 1 point
	 

	scoreLast.innerHTML = distance;

	scoreDist.innerHTML = distscore;

	scoreTotal.innerHTML = totalScore;



	scoreNb.innerHTML = nbScore
	averageScore = Math.trunc(totalScore / nbScore);
	scoreAverage.innerHTML = averageScore;
	
	//Stocker le score
	scoreArray.push(lastScore);
	
	//Stocker l'essai
	clicHistory.push([x,y,imageCoordinates.x,imageCoordinates.y,distance,randomCity.cityName]);
	
	//Effacer la carte avant d'afficher le prochain point
	drawMapClear();
	
	
console.log(y);

	//Afficher le clic, la cible & co
	drawMapClic(x,y,imageCoordinates.x,imageCoordinates.y,distance,randomCity.cityName);
	//drawMapClicWithCanvas(x,y,imageCoordinates.x,imageCoordinates.y,distance,randomCity.cityName);
	
	//Mise à jour de la difficulté
	//var selectElement = document.getElementById("diffSelect");
	//numberOfLinesToConsider = selectElement.value;

	//numberOfLinesToConsider has been replaced by neverStopGame below
	console.log(citiesList);
	sortedCitiesList = citiesList.sort((a, b) => b.latitude - a.latitude);
	console.log(sortedCitiesList);


	if(orderRSNP == 'NS'){
		randomCity = sortedCitiesList[citiesIt];
		
		
		citiesIt++;
		
		console.log(citiesIt);
	}
	else if(orderRSNP == 'RS')
	{
		randomIndex = Math.floor(Math.random() * citiesList.length);
		randomCity = citiesList[randomIndex];
	}

	console.log(randomCity);
	var cityName = randomCity?.cityName;
	targetInfo.innerHTML = i18n("newTarget", lang, cityName);
	targetInfo2.innerHTML = i18n("newTarget", lang, cityName);
	targetInfo3.innerHTML = i18n("newTarget", lang, cityName);
	const storedTheme = localStorage.getItem('selectedTheme');
	if (storedTheme) {
		applyTheme(storedTheme); // Apply stored theme on page load
	}
}
});


function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371; // Rayon de la Terre en kilomètres

  // Convertir les degrés en radians
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  // Calculer la distance
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadiusKm * c;

  return distance;
}

function selectRandomCity(csvContent, numberOfLinesToConsider) {
  // Séparer les lignes du fichier CSV
  const lines = csvContent.split('\n');
  
  console.log(lines);
 
  // Sélectionner les X premières lignes
  const selectedLines = lines.slice(0, numberOfLinesToConsider);
  console.log(numberOfLinesToConsider);
  console.log(selectedLines);

  // Choisir une ligne au hasard parmi les X premières lignes
  const randomLine = selectedLines[Math.floor(Math.random() * selectedLines.length)];
  
  // Séparer les valeurs de la ligne sélectionnée
  const values = randomLine.split(';');
  
  // Extraire les informations nécessaires
  const cityName = values[0];
  const department = values[2];
  const type = values[3];
  const longitude = parseFloat(values[5]); // Convertir en nombre
  const latitude = parseFloat(values[4]); // Convertir en nombre
  
  // Retourner les informations sélectionnées           // infojs is for detailed info //infojs2 is for image
  return { cityName, department, type, longitude, latitude ,infojs, infojs2};
}

function stopGame()
{
	let textTop3 = "";
	let textFlop3 = "";
	//On calcule le top3 et le flop3
	if(clicHistory.length > 3)
	{
		computeTop3Flop3();
		console.log(top3);
		console.log(flop3);
		textTop3 = `\n`+i18n("txtTop3", lang, top3[0][0], top3[0][1], top3[1][0], top3[1][1], top3[2][0], top3[2][1]);
		textFlop3 = `\n`+i18n("txtFlop3", lang, flop3[0][0], flop3[0][1], flop3[1][0], flop3[1][1], flop3[2][0], flop3[2][1]);
		console.log(textTop3);
		console.log(textFlop3);
	}

	targetInfo.style.display = "none"; //On cache le champ qui indique la cible
	targetInfo2.style.display = "none"; //On cache le champ qui indique la cible
	targetInfo3.style.display = "none"; //On cache le champ qui indique la cible
	//On stocke le recap dans la chaine pour la copie éventuelle
	textToCopy = i18n("txtScoreCopy",lang,totalScore, averageScore, currentMap.name, textTop3, textFlop3);
	document.getElementById("finish").innerHTML = i18n("scoreSummary", lang, totalScore, averageScore, getEvaluation(averageScore)) + `<br/>`+(textTop3 != "" ? `<div style="font-size: 10pt;padding:10px;">`+ textTop3 + `<br/>` + textFlop3 + `<br/></div>` : ``)+`<button onclick="generateAndOpenImage()">`+i18n("txtButtonShowRecap", lang)+`</button> <button id="copyButton" onclick="copyScoreToClipboard()">`+i18n("txtButtonCopyMyScore",lang)+`</button>`;
	/*if(numberOfLinesToConsider == 20) //Mode défi uniquement
	{
		document.getElementById("finish").innerHTML += generateScoreTable();
	}*/
	document.getElementById("finish").style.display = "block"; //On affiche le bloc de fin
	document.getElementById("settings").style.display = "block"; //On affiche le bloc de paramétrage
	gameOngoing = false;
}

function startGame(defi)
{
	//Reset score
	lastScore = 0;
	distscore = 0;
	totalScore = 0;
	nbScore = 0;
	averageScore = 0;
	scoreLast.innerHTML = ``;
	scoreTotal.innerHTML = ``;
	scoreNb.innerHTML = ``;
	scoreAverage.innerHTML = ``;
	scoreArray = []; //On vide le tableau des scores
	clicHistory = []; //On vide l'historique des clics
	top3 = []; //On vide le top 3
	flop3 = []; //On vide le flop 3
	
	//Cacher le bloc de fin
	document.getElementById("finish").style.display = "none";
	
	//Effacer les restes de la précédente parties
	drawMapClear();
	
	if(defi)
	{
		isDefi = true;
		//Création et lancement du défi
		citiesList = getCityListForToday();
		numberOfLinesToConsider = 20;
	}
	else
	{
		isDefi = false;
		//Prise en compte du paramétrage
		var selectElement = document.getElementById("diffSelect");
		numberOfLinesToConsider = selectElement.value;
		//Création de la liste mélangée
		citiesList = selectRandomCities(currentMap.csv, numberOfLinesToConsider);

		console.log(citiesList);

		//Enregistrement de la difficulté
			//22=préféectures de région, 96=préfectures, 320=sous-préfectures
		if (numberOfLinesToConsider == currentMap.categories.easy.totalCount) diffText = i18n("txtEasy2", lang, currentMap.categories.easy.difficulty);
		else if (numberOfLinesToConsider == currentMap.categories.medium.totalCount) diffText = i18n("txtMedium2", lang, currentMap.categories.medium.difficulty);
		else if (numberOfLinesToConsider == currentMap.categories.hard.totalCount) diffText = i18n("txtHard2", lang, currentMap.categories.hard.difficulty);
		//Troncage de la liste
		//  Récupérer tous les éléments radio avec le nom "nbCity"
		const radios = document.getElementsByName('nbCity');
		//  Parcourir tous les éléments radio
		for (let i = 0; i < radios.length; i++) {
			// Vérifier si l'élément radio est cochée
			if (radios[i].checked) {
				// Récupérer la valeur de l'élément radio cochée
				const valeurCochee = radios[i].value;
				if(valeurCochee < numberOfLinesToConsider) numberOfLinesToConsider = valeurCochee;
				break; // Sortir de la boucle une fois que la valeur a été trouvée
			}
		}
	}
	
	citiesIt = 0;

	sortedCitiesList2 = citiesList.sort((a, b) => b.latitude - a.latitude);
	if(orderRSNP == 'NS'){
		randomCity = sortedCitiesList2[0];
	}
	else if(orderRSNP == 'RS')
	{
		randomCity = citiesList[0];
	}
	
	
	
	console.log(randomCity);
	targetInfo.style.display = "block"; //On affiche le champ qui indique la cible
	targetInfo2.style.display = "block"; //On affiche le champ qui indique la cible
	targetInfo3.style.display = "block";
	var cityName = randomCity.cityName;
	
	targetInfo.innerHTML = i18n("newTarget", lang, cityName);
	targetInfo2.innerHTML = i18n("newTarget", lang, cityName);
	targetInfo3.innerHTML = i18n("newTarget", lang, cityName);
	document.getElementById("settings").style.display = "none"; //On cache le paramétrage
	
	gameOngoing = true;
}

function shuffleArray(array) {
	// Algorithme de mélange de Fisher-Yates
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function selectRandomCities(csvContent, numberOfLinesToConsider) {
	// Séparer les lignes du fichier CSV
	const lines = csvContent.split('\n');
	console.log(lines);
	console.log(numberOfLinesToConsider);
	// Sélectionner les X premières lignes
	const selectedLines = lines.slice(0);
	//const selectedLines = lines.slice(0, numberOfLinesToConsider);

	// Créer une liste des villes
	const cities = selectedLines.map(line => {
		const values = line.split(';');
		const cityName = values[0];
		const department = values[2];
		const type = values[3];
		const longitude = parseFloat(values[5]);
		const latitude = parseFloat(values[4]);
		const infojs = values[6];
		const infojs2 = values[7];
		return { cityName, department, type, longitude, latitude , infojs, infojs2};
	});
	
	// Mélanger aléatoirement la liste des villes
	const shuffledCities = shuffleArray(cities);
	
	return shuffledCities;
}

function getEvaluation(avgScore) {
	return `<font color="`+getEvaluationColor(avgScore)+`">`+getEvaluationText(avgScore)+`</font>`;
}

function getEvaluationText(avgScore) {
	if(avgScore <= currentMap.scoreThresholds.impressive) return i18n("scoreImpressive",lang);
	else if(avgScore <= currentMap.scoreThresholds.excellent) return i18n("scoreExcellent",lang);
	else if(avgScore <= currentMap.scoreThresholds.good) return i18n("scoreGood",lang);
	else if(avgScore <= currentMap.scoreThresholds.acceptable) return i18n("scoreAcceptable",lang);
	else if(avgScore <= currentMap.scoreThresholds.disappointing) return i18n("scoreDisappointing",lang);
	else return i18n("scoreNil",lang);
}

function getEvaluationColor(avgScore) {
	if(avgScore <= currentMap.scoreThresholds.impressive) return `limegreen`;
	else if(avgScore <= currentMap.scoreThresholds.excellent) return `yellowgreen`;
	else if(avgScore <= currentMap.scoreThresholds.good) return `deepskyblue`;
	else if(avgScore <= currentMap.scoreThresholds.acceptable) return `orange`;
	else if(avgScore <= currentMap.scoreThresholds.disappointing) return `orangered`;
	else return `crimson`;
}

function generateScoreTable()
{
	let table = `<table style="padding:1; border-spacing:0;font-size:8pt;"><tr>`;
	for (let i = 0; i < scoreArray.length; i++) {
		table += `<td style="border:1px solid; padding:1; border-spacing:0; background-color:` + getEvaluationColor(scoreArray[i]) + `">`+scoreArray[i]+`</td>`;
	}
	table += `</tr></table>`;
	return table;
}

function latToMercator(latitude) {
	return Math.log(Math.tan((90 + latitude) * Math.PI / 360)) / (Math.PI / 180);
}

function mercatorToLat(mercator) {
	return (Math.atan(Math.exp(mercator * Math.PI / 180)) * 360 / Math.PI) - 90;
}

function gpsToXY(projection, latitude, longitude, width, height, topLeftGPS, topRightGPS, bottomLeftGPS, bottomRightGPS) {
	if(projection == "mercator")
	{
		const xRatio = (longitude - topLeftGPS.longitude) / (topRightGPS.longitude - topLeftGPS.longitude);

		// Convertir la latitude en coordonnées y sur l'image (projection Mercator)
		const mercN = latToMercator(latitude);
		const mercTopLeft = latToMercator(topLeftGPS.latitude);
		const mercBottomLeft = latToMercator(bottomLeftGPS.latitude);
		const mercatorHeight = mercTopLeft - mercBottomLeft;
		const yRatio = (mercTopLeft - mercN) / mercatorHeight;

		const x = xRatio * width;
		const y = yRatio * height;

		return { x, y };
	}
	else if(projection == "laea")
	{
		//Projection parameters
        const sourceProjection = '+proj=laea +lat_0=52 +lon_0=10 +x_0=4321000 +y_0=3210000 +ellps=GRS80 +units=m +no_defs +type=crs';
        const destProjection = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'; // Projection WGS84

        //Min & Max of the map
		const x_min = 2555000;
		const x_max = 7405000;
		const y_min = 1350000;
		const y_max = 5500000;
		const ratio_h = (y_max-y_min)/height;
		const ratio_w = (x_max-x_min)/width;
		
        //Compute transformation
        var transform = proj4(sourceProjection, destProjection);
		var result = transform.inverse([longitude, latitude]);

		var x = (result[0] - x_min) / ratio_w;
		var y = (y_max - result[1]) / ratio_h;
		return {x, y};
	}
}

function xyToGPS(projection, x, y, width, height, topLeftGPS, topRightGPS, bottomLeftGPS, bottomRightGPS) {
	if(projection == "mercator")
	{
		const xRatio = x / width;
		const yRatio = y / height; 

		const longitude = topLeftGPS.longitude + xRatio * (topRightGPS.longitude - topLeftGPS.longitude);
		const mercN = latToMercator(topLeftGPS.latitude) - yRatio * (latToMercator(topLeftGPS.latitude) - latToMercator(bottomLeftGPS.latitude));
		const latitude = mercatorToLat(mercN);

		return { latitude, longitude };
	}
	else if(projection == "laea")
	{
		//Projection parameters
        const sourceProjection = '+proj=laea +lat_0=52 +lon_0=10 +x_0=4321000 +y_0=3210000 +ellps=GRS80 +units=m +no_defs +type=crs';
        const destProjection = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'; // Projection WGS84

        //Min & Max of the map
		const x_min = 2555000;
		const x_max = 7405000;
		const y_min = 1350000;
		const y_max = 5500000;
		const ratio_h = (y_max-y_min)/height;
		const ratio_w = (x_max-x_min)/width;
		
		
		//Compute transformation
        var transform = proj4(sourceProjection, destProjection);
		var result = transform.forward([(x_min + ratio_w * x), (y_max - ratio_h * y)]);

		return {latitude: result[1], longitude: result[0]};
	}
}

// Fonction pour récupérer la liste du jour
function getCityListForToday() {
	// Obtenir la date courante au format "YYYY-MM-DD"
	const todayDate = getCurrentDate();
	console.log(todayDate);
	// Vérifier si la liste des villes pour la date courante existe dans la collection
	if (currentMap.daily.hasOwnProperty(todayDate)) {
		// Renvoyer la liste des villes associée à la date courante
		return currentMap.daily[todayDate];
	} else {
		// Si aucune liste n'est trouvée pour la date courante, renvoyer une liste vide ou une liste par défaut
		return [];
	}
}

function getCurrentDate() {
	// Chaine contenant la date à Paris
	const dateString = new Date().toLocaleString("fr-FR", {timeZone: "Europe/Paris"});
	
	//Stocker la date
	defiDate = dateString.substring(0, 10);
	
	// Extraire les composants de la date
	const parts = dateString.split(' ')[0].split('/');
	const day = parts[0];
	const month = parts[1];
	const year = parts[2];

	// Former la nouvelle chaîne de date au format "AAAA-MM-JJ"
	return `${year}-${month}-${day}`;
}

function drawMapClear() {
	// Supprimer l'ancien point
	if (clickPoint) {
	  clickPoint.remove();
	}

	// Supprimer l'ancienne cible
	if (targetPoint) {
	  targetPoint.remove();
	}
	
	// Supprimer l'ancienne légende de la cible
	if (targetText) {
	  targetText.remove();
	}

	if (targetTextCopy) {
		targetTextCopy.remove();
	  }
  
	if (infoText) {
		infoText.remove();
	}
	
	if (infoTextCopy) {
		infoTextCopy.remove();
	}

	if (infoText2) {
		infoText2.remove();
	}

	if (infoText3) {
		infoText3.remove();
	}

	if (infoText4) {
		infoText4.remove();
	}

	// Supprimer l'ancienne légende de la distance
	if (distanceText) {
	  distanceText.remove();
	}
	
	// Récupérer le contexte 2D du canvas
	const canvas = document.getElementById('myCanvas');
	const ctx = canvas.getContext('2d');

	// Effacer le contenu du canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawMapClic(x,y,targetX,targetY,distance,cityName) {
	// Circle Pointing to Location clicked by User
	clickPoint = document.createElement('div');
	clickPoint.className = 'click-point';
	clickPoint.style.left = `${x}px`;
	clickPoint.style.top = `${y}px`;
	map.appendChild(clickPoint);
	
	// Circle Pointing to Correct Location
	targetPoint = document.createElement('div');
	targetPoint.className = 'target-point';  // Change this to different classname with different css OR add new Style in next lign for background color based on if condition
	targetPoint.style.left = `${targetX}px`;
	targetPoint.style.top = `${offsetY + targetY}px`;
	map.appendChild(targetPoint);
	
	// Text Box that has Name of Location
	targetText = document.createElement('div');
	targetText.className = 'target-text';
	targetText.innerHTML = randomCity.cityName;
	targetText.style.left = `${targetX + 10}px`;
	targetText.style.top = `${offsetY + targetY - 5}px`;
	map.appendChild(targetText);
	
	// Text Box that has Subsidiary info about Location (usually State of the Location)
	targetTextCopy = document.createElement('div');
	targetTextCopy.className = 'target-text-copyRight';


	targetTextCopy.innerHTML = randomCity.cityName;
	targetTextCopy.style.left = `${targetX + 10}px`;
	targetTextCopy.style.top = `${offsetY + targetY - 5}px`;
	score.appendChild(targetTextCopy);


	// Info Box with info about Location
	infoText = document.createElement('div');
	infoText.className = 'info-text';
	infoText.innerHTML = randomCity.department;
	infoText.style.left = `${targetX + 10}px`;
	infoText.style.top = `${offsetY + targetY - 5}px`;
	map.appendChild(infoText);

	infoTextCopy = document.createElement('div');
	infoTextCopy.className = 'info-text-copy';


	infoTextCopy.innerHTML = randomCity.department;
	infoTextCopy.style.left = `${targetX + 10}px`;
	infoTextCopy.style.top = `${offsetY + targetY - 5}px`;
	score.appendChild(infoTextCopy);

	// Info Box 2 with detailed info about Location
	infoText2 = document.createElement('div');

	infoText2 = document.createElement('div');
	infoText2.className = 'info-text-2';

	// Replace \n with <br> for proper HTML line breaks
	infoText2.innerHTML = randomCity.infojs;
	infoText2.style.left = `${targetX + 10}px`;
	infoText2.style.top = `${offsetY + targetY - 5}px`;
	score.appendChild(infoText2);

	// Info Box 3 with IMAGE if ANy

	infoText3 = document.createElement('div');
	
	infoText3 = document.createElement('div');
	infoText3.className = 'info-text-3';


	infoText4 = document.createElement('div');
	
	infoText4 = document.createElement('div');
	infoText4.className = 'info-text-4';

	// Replace \n with <br> for proper HTML line breaks
	

	
	if (
		randomCity.infojs2 &&
		(randomCity.infojs2.includes(".png") ||
		 randomCity.infojs2.includes(".jpeg") ||
		 randomCity.infojs2.includes(".jpg"))
	  ) {
		// Split the image sources by comma and remove any extra whitespace
		const imgSources = randomCity.infojs2.split(',').map(src => src.trim());
	  
		// Create img elements for each image source
		const imgTags = imgSources.map(
		  imgSrc => `<img src="${imgSrc}" alt="City Image" style="margin: 5px;">`
		).join(''); // Join the img tags into a single string
	  
		// Insert the generated img elements into the target container
		infoText3.innerHTML = imgTags;
	  
		// Set positioning styles for the container
		infoText3.style.left = `${targetX + 10}px`;
		infoText3.style.top = `${offsetY + targetY - 5}px`;
	  
		// Append the container to the score element
		score.appendChild(infoText3);


		infoText4.innerHTML = imgTags;
	  
		// Set positioning styles for the container
		infoText4.style.left = `${targetX + 10}px`;
		infoText4.style.top = `${offsetY + targetY - 5}px`;
	  
		// Append the container to the score element
		score.appendChild(infoText4);
	  }


	// Display Distance between User clicked location and Actual Location
	distanceText = document.createElement('div');
	distanceText.className = 'distance-text';
	distanceText.innerHTML = distance + `km`
	distanceText.style.left = `${(targetX + x)/2 + 5}px`;
	distanceText.style.top = `${(offsetY + targetY + y)/2 - 10}px`;
	map.appendChild(distanceText);
	
	

	// Récupérer le contexte 2D du canvas
	const canvas = document.getElementById('myCanvas');
	const ctx = canvas.getContext('2d');

	// Tracer une ligne entre les deux points
	ctx.beginPath();
	ctx.moveTo(targetX, targetY);
	ctx.lineTo(x, y - offsetY);
	ctx.strokeStyle = 'white'; // Couleur de la ligne
	ctx.lineWidth = 1.2; // Epaisseur de la ligne
	ctx.stroke();	
}

function drawMapClicWithCanvas(x, y, targetX, targetY, distance, cityName) {
    // Récupérer le canvas et son contexte
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // Dessiner le point cliqué
    ctx.beginPath();
    ctx.arc(x, y - offsetY, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'red'; // Couleur du point cliqué
    ctx.fill();

    // Dessiner la cible
    ctx.beginPath();
    ctx.arc(targetX, targetY, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'green'; // Couleur de la cible
    ctx.fill();

    // Dessiner le texte de la cible
    ctx.fillStyle = 'black'; // Couleur du texte
    ctx.font = '12px Arial';
    ctx.fillText(cityName, targetX + 5, targetY - 5);

    // Dessiner le texte de la distance
    ctx.fillText(distance + 'km', (targetX + x) / 2 + 5, (targetY + y  - offsetY) / 2 - 5);

    // Dessiner la ligne entre les deux points
    ctx.beginPath();
    ctx.moveTo(targetX, targetY);
    ctx.lineTo(x, y - offsetY);
    ctx.strokeStyle = 'black'; // Couleur de la ligne
    ctx.lineWidth = 1; // Epaisseur de la ligne
    ctx.stroke();
}

function drawMapBackground() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Dessinez l'image sur tout le canvas
}

function generateAndDownloadImage() {
	// Récupérer le canvas et son contexte
	const canvas = document.getElementById('myCanvas');
	const ctx = canvas.getContext('2d');

	//On efface la carte
	drawMapClear();
	
	//On dessine le fond
	drawMapBackground();
	
	//On affiche tous les points 
	for (const element of clicHistory) {
		drawMapClicWithCanvas(element[0],element[1],element[2],element[3],element[4],element[5]);
	}

	// Convertir le contenu du canvas en URL de données au format PNG
	const dataURL = canvas.toDataURL('image/png');

	// Créer un élément <a> pour télécharger l'image
	const downloadLink = document.createElement('a');
	downloadLink.href = dataURL;
	downloadLink.download = 'image.png';
	document.body.appendChild(downloadLink);

	// Cliquer sur le lien de téléchargement
	downloadLink.click();

	// Supprimer l'élément <a> après le téléchargement
	document.body.removeChild(downloadLink);
	
}

function generateAndOpenImage() {
    // Récupérer le canvas
    const canvas = document.getElementById('myCanvas');
	const ctx = canvas.getContext('2d');
	
	//On efface la carte
	drawMapClear();
	
	//On dessine le fond
	drawMapBackground();
	
	//On affiche tous les points 
	for (const element of clicHistory) {
		drawMapClicWithCanvas(element[0],element[1],element[2],element[3],element[4],element[5]);
	}
	
	
	//Ecrire la date et le score total
	// Définir la police et la taille du texte
	ctx.font = '20px Arial';
	ctx.fillStyle = 'black';
	if(isDefi)
	{
		// Dessiner le texte sur le canvas
		ctx.fillText(i18n("txtRecapChallenge",lang,defiDate), 10, 30);
	}
	else
	{
		ctx.fillText(i18n("txtRecapFreePractice",lang,diffText), 10, 30);
	}
	ctx.fillText(i18n("txtRecapScore",lang,totalScore,averageScore,getEvaluationText(averageScore)),10,60);
    
	// Convertir le contenu du canvas en Blob (format PNG)
	canvas.toBlob(function(blob) {
		// Créer une URL à partir du Blob
		const url = URL.createObjectURL(blob);
		
		// Ouvrir l'image dans un nouvel onglet
		const imageWindow = window.open(url, '_blank');
		
		// Si la fenêtre est bloquée par le navigateur, informer l'utilisateur
		if (!imageWindow || imageWindow.closed || typeof imageWindow.closed == 'undefined') {
			alert(i18n("popupAlert",lang));
		}
	}, 'image/png');
	
	drawMapClear();
}

function copyScoreToClipboard() {
	// Créer un élément de texte temporaire
	const tempInput = document.createElement('textarea');
	tempInput.value = textToCopy;
	document.body.appendChild(tempInput);
	
	// Sélectionner le texte
	tempInput.select();
	tempInput.setSelectionRange(0, 99999); // Pour les mobiles
	
	// Copier le texte dans le presse-papiers
	document.execCommand('copy');
	
	// Supprimer l'élément temporaire
	document.body.removeChild(tempInput);
}

function computeTop3Flop3()
{
	//Créer un tableau à trier
	const sortedScore = [];
	for (const element of clicHistory) {
		sortedScore.push([element[5],element[4]]);
	}
	
    // Trier le tableau en fonction de la valeur de distance
    sortedScore.sort((a, b) => a[1] - b[1]);

    // Extraire les 3 premiers et les 3 derniers éléments
    top3 = sortedScore.slice(0, 3);
    flop3 = sortedScore.slice(-3);
}

function generateScale()
{
	let scale = "";
	let lastThreshold = -1;
	for (const key in currentMap.scoreThresholds) {
		if (currentMap.scoreThresholds.hasOwnProperty(key)) {
			const value = currentMap.scoreThresholds[key];
			scale += `<font color="`+getEvaluationColor(value)+`">[`+(lastThreshold+1)+`-`+value+`] `+getEvaluationText(value)+`</font> – `;	
			lastThreshold = value;
		}
	}
	scale += `<font color="`+getEvaluationColor(lastThreshold+1)+`">[`+(lastThreshold+1)+`+] `+getEvaluationText(lastThreshold+1)+`</font>`;
	return scale;
}
