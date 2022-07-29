const filterJobs = (query, jobs) => {
  let results = [];

  jobs.forEach(job => {
    if (JSON.stringify(job).indexOf(query) !== -1) {
      results.push(job);
    }
  });

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