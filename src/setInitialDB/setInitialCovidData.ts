/*
	크롤링 시작하기 전 날짜의 데이터들을 데이터베이스에 넣습니다. - covidData
*/
import setCovidData from '../services/setCovidData'
import apiCall from '../services/apiCall';
import openApi from '../config/openApi';

// covid data 세팅, 1월 16일부터 배열 2째부터임 (16일 confirmed - 15일 confirmed)
const setInitialCovidData = async () => {
	const covidData = await apiCall(openApi.covid_stat);
	for (let i = 2; i < covidData.length; i++) {
		await setCovidData(covidData, i);
	};
}

export default setInitialCovidData;
