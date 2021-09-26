/*
  Data updates every 10:00am
*/

import cron from 'node-cron';
import openApi from '../config/openApi';
import apiCall from '../services/apiCall';
import setCovidData from '../services/setCovidData'
import setVaccineData from '../services/setVaccineData';
import CovidDaily from '../models/CovidDaily';
import Vaccine from '../models/Vaccine';
import getDateRange from '../services/getDateRange'
import { AxiosRequestConfig } from 'axios';
import { Mongoose } from 'mongoose';

const updateData = async (model: Mongoose["Model"], api: AxiosRequestConfig) => {
  const storedData = await model.find({}).sort('date');
  const len = storedData.length;
  const oneDay = 1 * 24 * 60 * 60 * 1000;
  const lastDate = storedData[len - 1].date.getTime();
  const today = new Date().getTime();

  if (lastDate < today) {
    const dates = getDateRange(lastDate, today,0);

    if (model === CovidDaily) {
      const date = dates[0].replace(/-/g,"");
      openApi.covid_stat.url = openApi.covid_stat.url.replace(/startCreateDt=[0-9]*/,"startCreateDt=" + date);
      const data = await apiCall(api);
      const covidData = data.response.body.items.item
      for (let i = covidData.length - 2; i >= 0; i--) {
        await setCovidData(covidData, i);
      };
    } else if (model === Vaccine) {
      for (let i = 1; i < dates.length; i++) {
        openApi.vaccine_stat.url = `https://api.odcloud.kr/api/15077756/v1/vaccine-stat?page=1&perPage=10&cond%5BbaseDate%3A%3AEQ%5D=${dates[i]}%2000%3A00%3A00`;
        const vaccineData = await apiCall(openApi.vaccine_stat);
        await setVaccineData(vaccineData);
      };
    };
  };
};

const task = (time: string, api: AxiosRequestConfig) => cron.schedule(time, async () => {
  if (api === openApi.covid_stat) {
    updateData(CovidDaily, api);
  } else if (api === openApi.vaccine_stat) {
    updateData(Vaccine, api);
  }
});

export default task
