const axios = require('axios');

const fetchJobs = (jobRange, onSucc=()=>{}, onFail=()=>{}) => {
  const min = jobRange[0];
  const max = jobRange[1];
  axios({
    method: 'post',
    url: '/jobs',
    data: {min, max}
  })
  .then((response) => {
    onSucc(response.data)
  })
  .catch((err) => {
    //do something with error;
    onFail();
  });
};

const fetchRange = async (onSucc=()=>{}, onFail=()=>{}) => {
  let rs;
  axios({
    method: 'get',
    url: '/jobs/range'
  })
  .then((response) => {
    onSucc(response.data);
    rs = response.data;
  })
  .catch(err => onFail(err));
  return rs;
};

module.exports = {
  fetchJobs, fetchRange
};