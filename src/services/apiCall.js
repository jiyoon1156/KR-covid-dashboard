import axios from 'axios';

const apiCall = async (config) => {
  const calledData = await axios(config)
    .then((response) => {
      const dataSet = JSON.stringify(response.data);
      // console.log(dataSet);
      return dataSet;
    })
    .catch((error) => {
      const errMsg = error;
      // console.log(errMsg);
      return errMsg;
    });
  return calledData;
};

export default apiCall;
