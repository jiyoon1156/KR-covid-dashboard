const getDateRange = (startDay: number, endDay: number, subDay: number) => {
	const oneDay = 1 * 24 * 60 * 60 * 1000;
	let startDate = startDay;
	const endDate = endDay - subDay;
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

export default getDateRange;
