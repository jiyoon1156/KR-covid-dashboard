import axios, { AxiosRequestConfig } from 'axios';

const apiCall = async (config: AxiosRequestConfig) => {
  const calledData = await axios(config)
    .then((response) => {
      const dataSet = response.data;
      return dataSet;
    })
    .catch((error) => {
      const errMsg = error;
      console.log("============================")
      console.error(errMsg);
      console.log("============================")
    });
  return calledData;
};

export default apiCall;
