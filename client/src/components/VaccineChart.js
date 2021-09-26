import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Title from './Title';

// const vaccineData = [
//   {
//     name: '2021-07-23',
//     first: 2400,
//     scnd: 4000,
//   },
//   {
//     name: '2021-07-24',
//     first: 1398,
//     scnd: 3000,
//   },
//   {
//     name: '2021-07-25',
//     first: 9800,
//     scnd: 2000,
//   },
//   {
//     name: '2021-07-26',
//     first: 3908,
//     scnd: 2780,
//   },
//   {
//     name: '2021-07-27',
//     first: 4800,
//     scnd: 1890,
//   },
//   {
//     name: '2021-07-28',
//     first: 3800,
//     scnd: 2390,
//   },
//   {
//     name: '2021-07-29',
//     first: 4300,
//     scnd: 3490,
//   },
// ];

const VaccineChart = ({data}) => {

  data.forEach(element => {
    element.date = element.date.slice(0, 10);
  });

  const vaccineData = [];
  for(let i = 0; i < data.length; i++){
    const tmpObj = {
      date: data[i].date,
      first: data[i].accumulateFirstCnt,
      second: data[i].accumulateSecondCnt
    }
    vaccineData.push(tmpObj);
  }

  return (
    <>
      <Title>Total Vaccine Doses</Title>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={vaccineData}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />         
          <Tooltip />
          <Area type="monotone" dataKey="first" stackId="1" stroke="#ffc658" fill="#ffc658" />
          <Area type="monotone" dataKey="second" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default VaccineChart;
