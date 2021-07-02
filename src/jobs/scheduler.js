/*
  Data updates every 10:00am
*/

import cron from 'node-cron';
import openApi from '../config/openApi.js';
import apiCall from '../services/apiCall.js';
import setCovidData from '../services/setCovidData.js'
import setVaccineData from '../services/setVaccineData.js';
import CovidDaily from '../models/CovidDaily.js';
import getDateRange from '../services/getDateRange.js'

const task = (time, api) => cron.schedule(time, async () => {
  const data = await apiCall(api);
  if (api === openApi.covid_stat) {
    const covidInfo = await CovidDaily.find({}).sort('date');
    const len = covidInfo.length;

    const oneDay = 1 * 24 * 60 * 60 * 1000;
    const lastDate = covidInfo[len - 1].date.getTime();
    const today = new Date().getTime();
    if (lastDate < today) {
      const dates = getDateRange(lastDate + oneDay, today,0);
      for (let i = 0; i < dates.length; i++) {
        await setCovidData(data, data.length - dates.length + i);
      }
    };
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
