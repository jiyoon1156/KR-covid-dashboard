import Vaccine from '../models/Vaccine.js';

const setVaccineData = async (vaccineData) => {
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
	});
}

export default setVaccineData;
