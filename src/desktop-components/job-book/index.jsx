const React = require('react');
const { useState, useEffect } = require('react');
const ExpandedJob = require('./expanded.jsx');
const JobBookTable = require('./table.jsx');
const AppendJob = require('./appendJob.jsx');
const axios = require('axios');
const {filterJobs, parseRanges} = require('./jobFilter.js');
const requests = require('./requests.js');
const DeleteJobModal = require('./deleteJob.jsx');

const DesktopJobBook = props => {
  if (props.page !== 'Job Book') return;

  const {query, user, setAppStatus} = props;
  const [addJobModal, setAddJobModal] = useState(false);
  const [deleteJobModal, setDeleteJobModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [jobRange, setJobRange] = useState([-1, 1000]);
  const [focusedJob, setFocusedJob] = useState({});
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [possibleRanges, setPossibleRanges] = useState([]);
  const [selectedRange, setSelectedRange] = useState(null);

  const fetchAndSetJobRange = () => {
    requests.fetchRange(setJobRange);
  };

  useEffect(() => {
    fetchAndSetJobRange();
  }, []);

  useEffect(() => {
    let parsedRange = parseRanges(jobRange);
    setPossibleRanges(parsedRange);

    if (selectedRange === null || jobRange[0] !== -1) {
      setSelectedRange(parsedRange[parsedRange.length -1]);
      requests.fetchJobs(parsedRange[parsedRange.length -1], setJobs);
    } else {
      requests.fetchJobs(selectedRange || parsedRange[parsedRange.length -1], setJobs);
    }

  }, [jobRange]);

  useEffect(() => {
    if (selectedRange !== null && jobRange[0] !== -1) {
      requests.fetchJobs(selectedRange, setJobs);
    }
  }, [selectedRange]);

  useEffect(() => {
    setFilteredJobs(filterJobs(query, jobs));
  }, [jobs, query]);

  return (
    <div className="desktop-job-book-container">
      <ExpandedJob setAddJobModal={setAddJobModal} possibleRanges={possibleRanges} focusedJob={focusedJob} filteredJobs={filteredJobs} setSelectedRange={setSelectedRange} setJobs={setJobs} fetchAndSetJobRange={fetchAndSetJobRange} setDeleteJobModal={setDeleteJobModal}/>
      <JobBookTable fetchAndSetJobRange={fetchAndSetJobRange} jobs={filteredJobs} setFocusedJob={setFocusedJob}/>
      <AppendJob addJobModal={addJobModal} setAddJobModal={setAddJobModal} user={user} fetchAndSetJobRange={fetchAndSetJobRange} setAppStatus={setAppStatus}/>
      <DeleteJobModal user={user} render={deleteJobModal} setDeleteJobModal={setDeleteJobModal} fetchAndSetJobRange={fetchAndSetJobRange}/>
    </div>
  );
};

module.exports = DesktopJobBook