/*
  < Open API >
  1. Covid19 status from https://covid19api.com/
  2. Korea vaccination status from https://www.data.go.kr/index.do 2021-03-11부터 데이터있음
*/

import dotenv from 'dotenv';

dotenv.config();

const today = () => {
  const date = new Date();
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
    url: `https://api.odcloud.kr/api/15077756/v1/vaccine-stat?cond%5BbaseDate%3A%3AEQ%5D=${today}%2000%3A00%3A00`,
    headers: {
      Authorization: `Infuser ${process.env.AUTH_KEY}`,
    },
  },
};

export default openApi;
