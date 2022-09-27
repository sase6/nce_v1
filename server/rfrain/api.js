const axios = require('axios');
require('dotenv').config();

// Variables
const empty_func = () => null;
const rfrain_user = process.env.rfrain_user;
const rfrain_pass = process.env.rfrain_pass;
const rfrain_cname = "nce";
const rfrain_api_url = 'https://cloudsv1.rfrain.com/ZoneManager/rfrainapi.php/';
const rfrain_api_dbname = "nce";

const getSessionKey = async (storage={}, next=empty_func) => {
  const payload = {
    email: btoa(rfrain_user), 
    password: btoa(rfrain_pass),
    cname: rfrain_cname
  };

  try {
    const {data} = await axios({
      method: 'post',
      url: `${rfrain_api_url}get_sessionkey`,
      data: payload
    });

    let {sessionkey} = data.results;

    if (sessionkey) return next({...storage, sessionkey});
    else return next({error: data.message});
  } catch {
    return next({error: "Get Session Key: REQUEST FAILED"});
  }
};
