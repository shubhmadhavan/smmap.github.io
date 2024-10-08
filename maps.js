const maps = {
	np: {
		name: "National Parks",
		img: 'India_base_dark.png',
		projection: 'mercator',
		topLeftGPS: {latitude: 38.1, longitude: 67.31},
		bottomLeftGPS: {latitude: 6.00, longitude: 67.27},
		topRightGPS: {latitude: 38.09, longitude: 98.47},
		bottomRightGPS: {latitude: 5.91, longitude:  98.42},
		width: 1100,
		height: 1100,
		categories: {
			veryeasy: { name: "Federal capital", difficulty: "", coeff: 4, count: 1, totalCount: 1},
			easy: {name: "State capital", difficulty: "State capitals (33)", coeff: 3, count: 31, totalCount: 32},
			medium: {name: "State largest city", difficulty: "State capitals & State largest cities (61)", coeff: 2, count: 29, totalCount: 61},
			hard: {name: "Large city", difficulty: "Top 333 largest cities", coeff: 1, count: 270, totalCount: 331}
		},
		csv: csvNP,
		scoreThresholds: {
			impressive: 100,
			excellent: 200,
			good: 500, 
			acceptable: 1000,
			disappointing: 2000
		},
		daily: cityListsByDateUS,
		credits: {
			map: `<a href="https://themapsmith.github.io/site/bootstrap/" target="_blank">Mapsmith</a>)`,
			dataset: `<a href="https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population" target="_blank">Wikipedia</a>`
		},
		giveDetails: true
	},
	in: {
		name: "USA",
		img: 'India_base_dark.png',
		projection: 'mercator',
		topLeftGPS: {latitude: 38.1, longitude: 67.31},
		bottomLeftGPS: {latitude: 6.00, longitude: 67.27},
		topRightGPS: {latitude: 38.09, longitude: 98.47},
		bottomRightGPS: {latitude: 5.91, longitude:  98.42},
		width: 1100,
		height: 1100,
		categories: {
			veryeasy: { name: "Federal capital", difficulty: "", coeff: 4, count: 1, totalCount: 1},
			easy: {name: "State capital", difficulty: "State capitals (33)", coeff: 3, count: 31, totalCount: 32},
			medium: {name: "State largest city", difficulty: "State capitals & State largest cities (61)", coeff: 2, count: 29, totalCount: 61},
			hard: {name: "Large city", difficulty: "Top 333 largest cities", coeff: 1, count: 270, totalCount: 331}
		},
		csv: csvUS,
		scoreThresholds: {
			impressive: 100,
			excellent: 200,
			good: 500, 
			acceptable: 1000,
			disappointing: 2000
		},
		daily: cityListsByDateUS,
		credits: {
			map: `<a href="https://themapsmith.github.io/site/bootstrap/" target="_blank">Mapsmith</a>)`,
			dataset: `<a href="https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population" target="_blank">Wikipedia</a>`
		},
		giveDetails: true
	},
	rs: {
		name: "Europe",
		img: 'India_base_dark.png',
		projection: 'mercator',
		topLeftGPS: {latitude: 38.1, longitude: 67.31},
		bottomLeftGPS: {latitude: 6.00, longitude: 67.27},
		topRightGPS: {latitude: 38.09, longitude: 98.47},
		bottomRightGPS: {latitude: 5.91, longitude:  98.42},
		width: 1100,
		height: 1100,

		categories: {
			veryeasy: { name: "EU Capital", difficulty: "", coeff: 4, count: 1, totalCount: 1},
			easy: {name: "Capital", difficulty: "Capitals (45)", coeff: 3, count: 44, totalCount: 45},
			medium: {name: "Largest cities", difficulty: "Largest cities (87)", coeff: 2, count: 42, totalCount: 87},
			hard: {name: "Other cities", difficulty: "Top 233 largest cities", coeff: 1, count: 146, totalCount: 233}
		},
		csv: csvRS,
		scoreThresholds: {
			impressive: 100,
			excellent: 200,
			good: 500, 
			acceptable: 1000,
			disappointing: 2000
		},	
		daily: cityListsByDateEU,
		credits: {
			map: `CC-BY-SA – Alexrk2 (Wikimedia Commons user: <a href="https://commons.m.wikimedia.org/wiki/User:Alexrk2" target="_blank">Alexrk2</a>)`,
			dataset: `<a href="https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/table/?disjunctive.cou_name_en&sort=population&refine.timezone=Europe" target="_blank">GeoNames</a>`
		},
		giveDetails: false
	},
}