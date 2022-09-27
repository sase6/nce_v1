const axios = require('axios');
require('dotenv').config();

// Variables
const empty_func = (data) => data;
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

const getRecentlyScannedTags = async (storage={}, next=empty_func) => {
  const payload = {
    sessionkey: storage.sessionkey
  };

  const filterStatusResults = (arrOfStatusObj) => {
    const results = {};
    arrOfStatusObj.forEach(statusObj => {
      const {tagnumb, current_access_utc} = statusObj;
      
      if (results[tagnumb] && results[tagnumb].utc_access > parseFloat(current_access_utc)) return;
      const {tagname, subzone, current_access, current_reader, current_readername} = statusObj;
      results[tagnumb] = {
        tagnumb, tagname, utc_access: parseFloat(current_access_utc),
        current_access, subzone, current_reader, current_readername
      };
    });

    return Object.values(results);
  };

  try {
    const {data} = await axios({
      method: 'post',
      url: `${rfrain_api_url}get_list_of_tags_status`,
      data: payload
    });

    let results = data.results?.record_details;
    if (!results) return next({error: data.message});

    return next({...storage, tags: filterStatusResults(results)});
  } catch {
    return next({error: "Get Recent Tags: REQUEST FAILED"});
  }
};

const getCustomTagInfo = async (storage={}, next=empty_func) => {
  const {sessionkey, tags} = storage;
  const tagDataPromises = [];

  const filterArrOfTagHistory = (arrOfCustomTagInfoHistory) => {
    const result = arrOfCustomTagInfoHistory[0];
    arrOfCustomTagInfoHistory.forEach(tagData => {
      if (parseFloat(result.access_utc) < parseFloat(tagData.access_utc)) result = tagData;
    });

    return {
      tagnumb: result.tagnumb,
      tagname: result.tagname,
      modelNumber: result.custom1,
      jobNumber: result.custom2,
      voltage: result.custom3,
      type: result.custom4,
      other: result.custom5,
      lastAccess: result.access,
      inputBy: result.reader
    };
  };

  tags.forEach(({tagnumb}) => {
    tagDataPromises.push(axios({
      method: 'post',
      url: `${rfrain_api_url}get_tag_custom_information`,
      data: {
        sessionkey,
        tagnumb,
        dbname: rfrain_api_dbname
      }
    }));
  });

  try {
    let resolvedTagDataPromises = await Promise.all(tagDataPromises);
    const results = [];
    resolvedTagDataPromises.forEach(({data}) => {
      if (data.success) {
        results.push(filterArrOfTagHistory(data.results?.results));
      } else results.push(null);
    });

    return next({...storage, customTagData: results.filter(data => data!==null)});
  } catch {
    console.log('errr');
    return next({error: "Get Custom Tag Information: REQUEST FAILED"});
  }
};

const getTagStatusAndData = (storage={}, next=empty_func) => {
  const {customTagData, tags} = storage;
  if (!customTagData || !tags) return next({error: "Missing 1 or More Required Field In Storage Object"});

  const results = {};
  customTagData.forEach(tagData => {
    results[tagData.tagnumb] = tagData;
  });

  tags.forEach(tagData => {
    const tagnumb = tagData.tagnumb;
    if (results[tagnumb]) {
      results[tagnumb] = {...results[tagnumb], ...tagData}
    }
  });

  return next({tagStatusAndCustomInfo: Object.values(results), ...storage});
};

const syncToReaders = async (storage={}, next=empty_func) => {
  const {readersToSync, sessionkey, customTagData} = storage;
  if (readersToSync === undefined || sessionkey === undefined || customTagData === undefined) return next({error: 'Sync To Readers: MISSING PARAMETERS'});

  const syncToReadersPromises = [];
  const amtOfDataToSync = readersToSync.length * customTagData.length;

  readersToSync.forEach(readerid => {
    customTagData.forEach((tagData) => {
      const {tagname, modelNumber, jobNumber, voltage, type, other} = tagData;
      const arrOfTagData = [tagname || '', modelNumber || '', jobNumber || '', voltage || '', type || '', other || ''];

      const payload = {
        sessionkey,
        readerid,
        tagnumb: tagData.tagnumb,
        tagdata: arrOfTagData.join(',')
      };

      syncToReadersPromises.push(axios({
        method: 'post',
        url: `${rfrain_api_url}set_tag_custom_information`,
        data: payload
      }));
    });
  });

  try {
    const results = await Promise.all(syncToReadersPromises);
    let count = 0;
    results.forEach(result => count = result.data.success? count + 1 : count);
    return next({...storage, sync: {
      amtToProcess: amtOfDataToSync,
      amtSuccess: count,
      time: (new Date).toLocaleTimeString()
    }});

  } catch {
    return next({error: 'Sync To Readers: REQUEST FAILED'});
  }
};

const queryDataSet = (storage, next=empty_func) => {
  const {queries} = storage;
  if (queries === undefined) return next({...storage});
  let results = [];

  queries.forEach(query => {
    let result = storage;
    query.forEach(prop => result = result[prop]);
    results.push(result);
  });

  return next({queriedDataSet: results});
};

const pipe = async (arrOfFuncs=[], preStorage={}, errHandler=empty_func, successHandler=empty_func) => {
  let promiseIndex = 0; 
  let storage = preStorage;
  
  const furfilPromise = async () => {
    if (promiseIndex === arrOfFuncs.length) return successHandler(storage);
    try {
      storage = await arrOfFuncs[promiseIndex](storage);
      if (storage.error) return errHandler(storage.error);

      promiseIndex++;
      return await furfilPromise();
    } catch {
      return errHandler({pipeErr: "PIPING FAILED"});
    }
  };

  return await furfilPromise();
};

module.exports = {
  pipe,
  getSessionKey, 
  getRecentlyScannedTags,
  getCustomTagInfo,
  getTagStatusAndData,
  syncToReaders,
  queryDataSet
};