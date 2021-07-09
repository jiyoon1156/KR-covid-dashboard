import Vaccine from '../models/Vaccine';

const setVaccineData = async (vaccineData: any) => {
	console.log(vaccineData.data[0]);
	const vaccDate = vaccineData.data[0].baseDate;
	const accumFirst = vaccineData.data[0].totalFirstCnt;
	const accumSecnd = vaccineData.data[0].totalSecondCnt;

	const vaccination = await new Vaccine({
		date: vaccDate,
		accumulateFirstCnt: accumFirst,
		accumulateSecondCnt: accumSecnd,
	});
	await vaccination.save((err: Error) => {
		if (err) return console.error(err);
	});
}

export default setVaccineData;
