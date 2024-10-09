// Tableau de traductions
const translations = {
    en: {
		txtLastScore: "Last Distance:",
		txtAverageScore: "<span style=\"color:grey;\">Average Distance:</span>",
		
		txtEasy: "Easy",
		txtMedium: "Medium",
		txtHard: "Hard",
		txtNbCitiesTitle: "Locations:",
		txtCitiesAll: "All",
		startGameButton: "Start",
		finish: "Game over!",

	

		newTarget: "<span style=\"color:grey;\">Locate:</span> <span style=\"color:#5dc5c5; opacity:100% !important;\"> %1 </span>",
		txtEasy2: "Easy (%1)",
		txtMedium2: "Medium (%1)",
		txtHard2: "Hard (%1)",

		txtTop3: "Top 3: %1 (%2km), %3 (%4km), %5 (%6km)",
		txtFlop3: "Flop 3: %1 (%2km), %3 (%4km), %5 (%6km)",
	
		txtButtonShowRecap: "Show a recap",
		txtButtonCopyMyScore: "Copy my score",

		
		txtRecapChallenge: "Challenge of %1",
		txtRecapFreePractice: "Free practice – Difficulty : %1",
		txtRecapScore: "Score: %1 – Average: %2 – %3",
		popupAlert: "The pop-up windows is blocked. Please enable the pop-ups to see the image.",
		
		txtCreditsGame: "Game developed by Olivier Genest",
		distanceFrom: "Distance from %1: %4km",

		txtTitle: "Shubh's Map Repository",

		txtDifficulty: "Difficulty:"
    },
	fr: {
		txtLastScore: "Last Distance:",
		txtAverageScore: "Average Distance:",
		txtNumberOfGames: "Locations Covered:",
		txtEasy: "Easy",
		txtMedium: "Medium",
		txtHard: "Hard",
		txtNbCitiesTitle: "Locations:",
		txtCitiesAll: "All",
		startGameButton: "Start",
		finish: "Game over!",

	

		newTarget: "Find... <i>%1</i>",
		txtEasy2: "Easy (%1)",
		txtMedium2: "Medium (%1)",
		txtHard2: "Hard (%1)",

		txtTop3: "Top 3: %1 (%2km), %3 (%4km), %5 (%6km)",
		txtFlop3: "Flop 3: %1 (%2km), %3 (%4km), %5 (%6km)",
	
		txtButtonShowRecap: "Show a recap",
		txtButtonCopyMyScore: "Copy my score",

		
		txtRecapChallenge: "Challenge of %1",
		txtRecapFreePractice: "Free practice – Difficulty : %1",
		txtRecapScore: "Score: %1 – Average: %2 – %3",
		popupAlert: "The pop-up windows is blocked. Please enable the pop-ups to see the image.",
		txtScoreExplanations: `Exaplanations regarding the score: <ul><li>The lower the score, the better</li><li>The score of each try is:<br/>distance × difficulty-coeff</li><li>The difficulty-coeff depends on the size of the city: 4 for the %1, 3 for a %2, 2 for a %3, 1 for a %4</li><li>Here is the scale of score assessment: <br/>%5</li></ul>`,
		txtCreditsMap: "Map %1",
		txtCreditsDataset: "Dataset %1",
		txtLegalMentions: "Legal information",
		txtCreditsGame: "Game developed by Olivier Genest",
		distanceFrom: "Distance from %1: %4km",

		txtTitle: "Shubh's Map Repository",

		txtDifficulty: "Difficulty:"
    }
};

// Fonction pour récupérer une traduction

function translate(key, language) {
    // Vérifie si la langue est prise en charge
    if (!translations[language]) {
        console.error(`La langue "${language}" n'est pas prise en charge.`);
        return "";
    }

    // Vérifie si la clé de traduction existe dans la langue spécifiée
    if (!translations[language][key]) {
        console.error(`La clé "${key}" n'existe pas pour la langue "${language}".`);
        return "";
    }

    // Retourne la traduction correspondante
    return translations[language][key];
}

function i18n(key, language, ...values) {
	return dynamicReplace(translate(key,language),...values);
}


function dynamicReplace(sentence, ...args) {
  return sentence.replace(/%(\d+)/g, (match, index) => {
    const argIndex = parseInt(index, 10) - 1;
    return args[argIndex] !== undefined ? args[argIndex] : match;
  });
}

function applyI18nToHtml(language, ...ids) {
	for (const id of ids) {
		document.getElementById(id).innerHTML = i18n(id, language);
	}
}