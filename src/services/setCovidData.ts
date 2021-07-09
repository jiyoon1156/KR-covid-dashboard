import CovidDaily from '../models/CovidDaily';
import CovidComposition from '../models/CovidComposition';

const setDaily = async (covidData: any, i: number) => {
	console.log(covidData[i]);
	const covidStat = await new CovidDaily({
		date: covidData[i].Date,
		confirmed: covidData[i].Confirmed - covidData[i - 1].Confirmed,
	});
	await covidStat.save((err: Error) => {
		if (err) return console.error(err);
	})
};

const setComposition = async (covidData: any, i: number) => {
	const covidCompose = await new CovidComposition({
		date: covidData[i].Date,
		accumulatedConfirmed: covidData[i].Confirmed,
		deaths: covidData[i].Deaths,
		recovered: covidData[i].Recovered,
		active: covidData[i].Active,
	});
	await covidCompose.save((err: Error) => {
		if (err) return console.error(err);
	});
};

const setCovidData = async (covidData: any, i: number) => {
	try {
		await Promise.all([
			setDaily(covidData, i),
			setComposition(covidData, i)
		]);
	} catch (err) {
		console.error(err);
	}
};

export default setCovidData;
