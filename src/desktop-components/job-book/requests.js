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

const fetchRange = (onSucc=()=>{}, onFail=()=>{}) => {
  axios({
    //
  })
  .then()
  .catch()
};

module.exports = {
  fetchJobs,
};