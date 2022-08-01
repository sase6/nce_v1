const removeSpaces = (inputString) => {
  let string = "";
  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] !== ' ') string = string + inputString[i];
  }
  return string;
};

const filterJobs = (query, jobs) => {
  let results = [];

  let map = {
    JOB: 'jobNumber',
    MODEL: 'modelNumber',
    VOLTAGE: 'voltage'
  };
  
  let colonIndex = query.indexOf(':');

  if (colonIndex !== -1) {
    let deepQueryString = query.split(':');
    let prop = map[removeSpaces(deepQueryString[0]).toUpperCase()];
    let search = removeSpaces(deepQueryString[1]);

    jobs.forEach(job => {
      if (job[prop].toString().toUpperCase().indexOf(search.toUpperCase()) !== -1) results.push(job);
    });
  } else {
    //General Handler
    jobs.forEach(job => {
      if (JSON.stringify(job).indexOf(query) !== -1) {
        results.push(job);
        //Scrap handler 
      } else if ('SCRAP'.indexOf(query) !== -1) {
        if (job.scrap) results.push(job);
      }
    });
  }


  return results;
};

const parseRanges = (range) => {
  let min = range[0];
  let max = range[1];
  let results = [];

  let smallest = min - min%1000;
  let largest = (max - max%1000) + 1000;

  for (let i = smallest; i < largest; i+=1000) {
    results.push([i, i + 1000]);
  }

  return results;
};

module.exports = {filterJobs, parseRanges};