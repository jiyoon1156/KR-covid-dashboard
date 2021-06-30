/*
	크롤링 시작하기 전 날짜의 데이터들을 데이터베이스에 넣습니다. - covidData
*/
import CovidDaily from '../models/CovidDaily.js';
import CovidComposition from '../models/CovidComposition.js';
import apiCall from '../services/apiCall.js';
import openApi from '../config/openApi.js';

// covid data 세팅, 1월 16일부터 배열 2째부터임 (16일 confirmed - 15일 confirmed)
const setCovidData = async () => {
	const covidData = await apiCall(openApi.covid_stat);

	for (let i = 2; i < covidData.length; i++) {

		const covidStat = await new CovidDaily({
			date: covidData[i].Date,
			confirmed: covidData[i].Confirmed - covidData[i - 1].Confirmed,
		});

		const covidCompose = await new CovidComposition({
			date: covidData[i].Date,
			accumulatedConfirmed: covidData[i].Confirmed,
			deaths: covidData[i].deaths,
			recovered: covidData[i].recovered,
			active: covidData[i].active,
		})

		await covidStat.save((err, covid) => {
			if (err) return console.error(err);
			// console.dir(covid);
		})

		await covidCompose.save((err) => {
			if (err) return console.error(err);
		})
	}
};

export default setCovidData;
