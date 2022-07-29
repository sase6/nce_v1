const filterJobs = (query, jobs) => {
  let results = [];

  jobs.forEach(job => {
    if (JSON.stringify(job).indexOf(query) !== -1) {
      results.push(job);
    }
  });

  return results;
};