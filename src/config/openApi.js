/*
  < Open API >
  1. Covid19 status from https://covid19api.com/
  2. Korea vaccination status from https://www.data.go.kr/index.do 2021-03-11부터 데이터있음
*/

import dotenv from 'dotenv';

dotenv.config();

const yesterday = () => {
  const date = new Date();
  const yesterdate = date.getTime() - (1*24*60*60*1000);
  date.setTime(yesterdate);

  const year = date.getFullYear();
  const month = (`0${1 + date.getMonth()}`).slice(-2);
  const day = (`0${date.getDate()}`).slice(-2);

  return `${year}-${month}-${day}`;
};

const openApi = {
  covid_stat: {
    method: 'get',
    url: 'https://api.covid19api.com/live/country/korea-south/status/confirmed',
    headers: { },
  },
  vaccine_stat: {
    method: 'get',
    url: `https://api.odcloud.kr/api/15077756/v1/vaccine-stat?page=1&perPage=10&cond%5BbaseDate%3A%3AEQ%5D=${yesterday()}%2000%3A00%3A00`,
    headers: {
      Authorization: `Infuser ${process.env.AUTH_KEY}`,
    },
  },
};

export default openApi;
