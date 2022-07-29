const React = require('react');
const { useState, useEffect } = require('react');
const ExpandedJob = require('./expanded.jsx');
const JobBookTable = require('./table.jsx');
const AppendJob = require('./appendJob.jsx');
const axios = require('axios');
const filterJobs = require('./jobFilter.js');
const requests = require('./requests.js');

const DesktopJobBook = props => {
  if (props.page !== 'Job Book') return;

  const {query, user} = props;
  const [addJobModal, setAddJobModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [jobRange, setJobRange] = useState([0, 1000]);
  const [focusedJob, setFocusedJob] = useState({});
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  useEffect(() => {
    setFilteredJobs(filterJobs(query, jobs));
  }, [jobs, query]);

  useEffect(() => {
    // fetch the ranges, then fetch jobs based on range??
    requests.fetchJobs(jobRange, setJobs);
  }, []);

  return (
    <div className="desktop-job-book-container">
      <ExpandedJob setAddJobModal={setAddJobModal}/>
      <JobBookTable />
      <AppendJob addJobModal={addJobModal} setAddJobModal={setAddJobModal} user={user}/>
    </div>
  );
};

module.exports = DesktopJobBook