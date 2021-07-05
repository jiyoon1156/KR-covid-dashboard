import setInitialCovidData from './setInitialCovidData';
import setInitialVaccineData from './setInitialVaccineData';
import CovidDaily from '../models/CovidDaily';
import Vaccine from '../models/Vaccine';

//디비가 없으면 하고 있으면 안해
const setInitialDB = async () => {
	try {
		const [covidInfo, vaccineInfo] = await Promise.all([
			CovidDaily.find({}),
			Vaccine.find({})
		]);
		if (covidInfo.length == 0) {
			setInitialCovidData();
		};
		if (vaccineInfo.length == 0) {
			setInitialVaccineData()
		};
	} catch (err) {
		console.error(err);
	}
}

export default setInitialDB;
