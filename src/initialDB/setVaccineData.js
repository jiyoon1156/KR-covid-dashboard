/*
	크롤링 시작하기 전 날짜의 데이터들을 데이터베이스에 넣습니다. - vaccineData
*/
import Vaccine from '../models/Vaccine.js';
import apiCall from '../services/apiCall.js';
import openApi from '../config/openApi.js';

// vaccine data 세팅, 3월 11일 데이터부터 ~ 어제까지 ${인자} 로 넘겨서 받아와서 쌓아놓기
const getDateRange = () => {
	const oneDay = 1 * 24 * 60 * 60 * 1000;
	let startDate = new Date(2021, 2, 11).getTime(); //2021-03-11
	const endDate = new Date().getTime() - oneDay; //yesterday
	let dateArray = new Array();

	while (startDate < endDate) {
		const date = new Date();
		date.setTime(startDate);
		const year = date.getFullYear();
  	const month = (`0${1 + date.getMonth()}`).slice(-2);
		const day = (`0${date.getDate()}`).slice(-2);
		dateArray.push(`${year}-${month}-${day}`);
		startDate += oneDay
	}
	return dateArray
}

//vaccine data 의 경우 날짜를 인수로 받아야 함
const setVaccineData = async () => {
	const dates = await getDateRange();

	for (let i = 0; i < dates.length; i++) {
		openApi.vaccine_stat.url = `https://api.odcloud.kr/api/15077756/v1/vaccine-stat?page=1&perPage=10&cond%5BbaseDate%3A%3AEQ%5D=${dates[i]}%2000%3A00%3A00`;
		const vaccineData = await apiCall(openApi.vaccine_stat);

		const vaccDate = vaccineData.data[0].baseDate;
		const accumFirst = vaccineData.data[0].totalFirstCnt;
		const accumSecnd = vaccineData.data[0].totalSecondCnt;

		const vaccination = await new Vaccine({
			date: vaccDate,
			accumulateFirstCnt: accumFirst,
			accumulateSecondCnt: accumSecnd,
		});
		await vaccination.save((err, vac) => {
			if (err) return console.error(err);
			console.dir(vac);
		})
	};
}

export default setVaccineData;
