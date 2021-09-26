/*
	크롤링 시작하기 전 날짜의 데이터들을 데이터베이스에 넣습니다. - covidData
*/
import setCovidData from '../services/setCovidData'
import apiCall from '../services/apiCall';
import openApi from '../config/openApi';

// covid data 세팅, 8월 1일부터
const setInitialCovidData = async () => {
	const covidData = await apiCall(openApi.covid_stat);
	for (let i = covidData.length - 2; i >= 0; i--) {
		await setCovidData(covidData, i);
	};
}

export default setInitialCovidData;
