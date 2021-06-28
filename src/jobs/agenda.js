/*
  Covid19 status updated every ?pm
  Vaccination status updated every 10:00pm
  cron -> agenda 로 수정 필요
*/

import cron from 'node-cron';
import openApi from '../config/openApi.js';
import apiCall from '../services/apiCall.js';

// const task = (time, api) => cron.schedule(time, async () => {
//   const data = await apiCall(api);
//   console.log(data);
  // if (api === openApi.covid_stat) {
  //   // await parsing data logic
  //   console.log('covid stat to db');
  // } else if (api === openApi.vaccine_stat) {
  //   // await parsing data logic
  //   console.log('vaccine stat to db');
  // }
// });

// task('56 23 * * *', openApi.covid_stat).start();
// task('59 22 * * *', openApi.vaccine_stat).start();

const main = async () => {
  const temp = await apiCall(openApi.vaccine_stat);
  console.log(temp);
};
main();
