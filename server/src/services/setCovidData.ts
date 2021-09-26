import CovidDaily from '../models/CovidDaily';
import CovidComposition from '../models/CovidComposition';

const setDaily = async (covidData: any, i: number) => {
	const covidStat = await new CovidDaily({
		date: covidData[i].createDt,
		confirmed: covidData[i].decideCnt - covidData[i + 1].decideCnt,
	});
	await covidStat.save((err: Error) => {
		if (err) return console.error(err);
	})
};

const setComposition = async (covidData: any, i: number) => {
	const covidCompose = await new CovidComposition({
		date: covidData[i].createDt,
		accumulatedConfirmed: covidData[i].decideCnt,
		deaths: covidData[i].deathCnt,
		recovered: covidData[i].clearCnt,
		active: covidData[i].careCnt,
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
