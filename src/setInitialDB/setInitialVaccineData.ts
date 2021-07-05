/*
	크롤링 시작하기 전 날짜의 데이터들을 데이터베이스에 넣습니다. - vaccineData
*/
import setVaccineData from '../services/setVaccineData'
import apiCall from '../services/apiCall';
import openApi from '../config/openApi';
import getDateRange from '../services/getDateRange'

//vaccine data 의 경우 날짜를 인수로 받아야 함
const setInitialVaccineData = async () => {
	let startDate = new Date(2021, 2, 11).getTime();
	let endDate = new Date().getTime();
	const subDay = 1 * 24 * 60 * 60 * 1000;
	const dates = getDateRange(startDate, endDate, subDay);

	for (let i = 0; i < dates.length; i++) {
		openApi.vaccine_stat.url = `https://api.odcloud.kr/api/15077756/v1/vaccine-stat?page=1&perPage=10&cond%5BbaseDate%3A%3AEQ%5D=${dates[i]}%2000%3A00%3A00`;
		const vaccineData = await apiCall(openApi.vaccine_stat);
		await setVaccineData(vaccineData);
	};
}

export default setInitialVaccineData;
