/*
	크롤링 시작하기 전 날짜의 데이터들을 데이터베이스에 넣습니다.
*/
// import apiCall from '../services/apiCall';
// import openApi from '../config/openApi';
// const setData = async () => {
	// const covidData = await apiCall(openApi.covid_stat);
// }
const covid_data = [
		{"ID":"091c6bc6-73d4-459f-9db8-4cb590c16a5b","Country":"Korea (South)","CountryCode":"KR","Province":"","City":"","CityCode":"","Lat":"35.91","Lon":"127.77","Confirmed":70728,"Deaths":1195,"Recovered":55772,"Active":13761,"Date":"2021-01-14T00:00:00Z"},
		{"ID":"ec6c446a-bdb8-4def-858c-c1f53a48751d","Country":"Korea (South)","CountryCode":"KR","Province":"","City":"","CityCode":"","Lat":"35.91","Lon":"127.77","Confirmed":70728,"Deaths":1195,"Recovered":55772,"Active":13761,"Date":"2021-01-15T00:00:00Z"},
		{"ID":"e171bc8d-a299-4df6-965d-197d4bac1f23","Country":"Korea (South)","CountryCode":"KR","Province":"","City":"","CityCode":"","Lat":"35.91","Lon":"127.77","Confirmed":71241,"Deaths":1217,"Recovered":56536,"Active":13488,"Date":"2021-01-16T00:00:00Z"},
		{"ID":"73edf774-fff2-4062-826b-de89edf90bc8","Country":"Korea (South)","CountryCode":"KR","Province":"","City":"","CityCode":"","Lat":"35.91","Lon":"127.77","Confirmed":71820,"Deaths":1236,"Recovered":57554,"Active":13030,"Date":"2021-01-17T00:00:00Z"}
]
const vaccine_data = {"currentCount":10,"data":[{"accumulatedFirstCnt":5405968,"accumulatedSecondCnt":2144272,"baseDate":"2021-06-01 00:00:00","firstCnt":385535,"secondCnt":27064,"sido":"전국","totalFirstCnt":5791503,"totalSecondCnt":2171336},{"accumulatedFirstCnt":912940,"accumulatedSecondCnt":325342,"baseDate":"2021-06-01 00:00:00","firstCnt":75387,"secondCnt":8127,"sido":"서울특별시","totalFirstCnt":988327,"totalSecondCnt":333469},{"accumulatedFirstCnt":363185,"accumulatedSecondCnt":128019,"baseDate":"2021-06-01 00:00:00","firstCnt":30971,"secondCnt":1190,"sido":"부산광역시","totalFirstCnt":394156,"totalSecondCnt":129209},{"accumulatedFirstCnt":221401,"accumulatedSecondCnt":95667,"baseDate":"2021-06-01 00:00:00","firstCnt":13922,"secondCnt":1171,"sido":"대구광역시","totalFirstCnt":235323,"totalSecondCnt":96838},{"accumulatedFirstCnt":167177,"accumulatedSecondCnt":67042,"baseDate":"2021-06-01 00:00:00","firstCnt":10646,"secondCnt":1355,"sido":"광주광역시","totalFirstCnt":177823,"totalSecondCnt":68397},{"accumulatedFirstCnt":267203,"accumulatedSecondCnt":102017,"baseDate":"2021-06-01 00:00:00","firstCnt":18567,"secondCnt":716,"sido":"인천광역시","totalFirstCnt":285770,"totalSecondCnt":102733},{"accumulatedFirstCnt":92106,"accumulatedSecondCnt":35933,"baseDate":"2021-06-01 00:00:00","firstCnt":7085,"secondCnt":192,"sido":"울산광역시","totalFirstCnt":99191,"totalSecondCnt":36125},{"accumulatedFirstCnt":27723,"accumulatedSecondCnt":10445,"baseDate":"2021-06-01 00:00:00","firstCnt":1496,"secondCnt":30,"sido":"세종특별자치시","totalFirstCnt":29219,"totalSecondCnt":10475},{"accumulatedFirstCnt":147834,"accumulatedSecondCnt":58769,"baseDate":"2021-06-01 00:00:00","firstCnt":11060,"secondCnt":1032,"sido":"대전광역시","totalFirstCnt":158894,"totalSecondCnt":59801},{"accumulatedFirstCnt":213282,"accumulatedSecondCnt":79169,"baseDate":"2021-06-01 00:00:00","firstCnt":12750,"secondCnt":823,"sido":"강원도","totalFirstCnt":226032,"totalSecondCnt":79992}],"matchCount":18,"page":1,"perPage":10,"totalCount":1986}

// covid data 세팅, 1월 16일부터 배열 2째부터임 (16일 confirmed - 15일 confirmed)
const test_covid = () => {
	// console.log(covid_data.length)
	for (let i = 2; i < covid_data.length; i++) {
		console.log(covid_data[i].Date, covid_data[i].Confirmed - covid_data[i - 1].Confirmed)
	}
};

// vaccine data 세팅, 3월 11일 데이터부터 ~ 어제까지 ${인자} 로 넘겨서 받아와서 쌓아놓기
const getDateRange = () => {
	const oneDay = 1 * 24 * 60 * 60 * 1000;
	let startDate = new Date(2021, 2, 11).getTime() //2021-03-11
	const endDate = new Date().getTime() - oneDay; //yesterday
	let dateArray = new Array()

	while (startDate < endDate) {
		const date = new Date();
		date.setTime(startDate);
		const year = date.getFullYear();
  	const month = (`0${1 + date.getMonth()}`).slice(-2);
		const day = (`0${date.getDate()}`).slice(-2);
		dateArray.push(`${year}-${month}-${day}`);
		startDate += oneDay
	}
	console.log(dateArray.length)
	return dateArray
}

console.log(getDateRange())
const test_vac = () => {
};

// test_covid()
// test_vac()
