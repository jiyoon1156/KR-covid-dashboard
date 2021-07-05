import axios, { AxiosRequestConfig } from 'axios';

const apiCall = async (config: AxiosRequestConfig) => {
  const calledData = await axios(config)
    .then((response) => {
      const dataSet = response.data;
      // console.log(dataSet);
      return dataSet;
    })
    .catch((error) => {
      //api 가 500대 뱉을 경우 어쩔? 데이터 수급 어케 할거야?
      const errMsg = error;
      console.log("============================")
      console.error(errMsg);
      console.log("============================")
      // return errMsg;
    });
  return calledData;
};

export default apiCall;
