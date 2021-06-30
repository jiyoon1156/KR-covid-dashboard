import CovidDaily from '../models/CovidDaily.js';
import CovidComposition from '../models/CovidComposition.js';

const setCovidData = async (covidData, i) => {
	const covidStat = await new CovidDaily({
		date: covidData[i].Date,
		confirmed: covidData[i].Confirmed - covidData[i - 1].Confirmed,
	});

	const covidCompose = await new CovidComposition({
		date: covidData[i].Date,
		accumulatedConfirmed: covidData[i].Confirmed,
		deaths: covidData[i].Deaths,
		recovered: covidData[i].Recovered,
		active: covidData[i].Active,
	})

	await covidStat.save((err, covid) => {
		if (err) return console.error(err);
		// console.dir(covid);
	})

	await covidCompose.save((err) => {
		if (err) return console.error(err);
	})
}

export default setCovidData;
