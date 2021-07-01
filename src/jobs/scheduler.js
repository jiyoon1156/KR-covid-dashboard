/*
  Data updates every 10:00am
*/

import cron from 'node-cron';
import openApi from '../config/openApi.js';
import apiCall from '../services/apiCall.js';
import setCovidData from '../services/setCovidData.js'
import setVaccineData from '../services/setVaccineData.js';

const task = (time, api) => cron.schedule(time, async () => {
  const data = await apiCall(api);
  if (api === openApi.covid_stat) {
    //날짜 중복 확인 로직 필요
    await setCovidData(data, data.length - 1);
    console.log("=============open api covid successful============")
  } else if (api === openApi.vaccine_stat) {
    //날짜 중복 확인 로직 필요
    await setVaccineData(data);
    console.log("=============open api vaccine successful============")
  }
});

// task('56 23 * * *', openApi.covid_stat).start();
// task('3 15 * * *', openApi.vaccine_stat).start();

export default task
