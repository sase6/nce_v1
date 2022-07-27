const React = require('react');
const { useState, useEffect } = require('react');

const DesktopJobBookTable = props => {
  // props.jobs ===

  const [jobs, setjobs] = useState([]);

  const filterJobs = jobs => {
    let jobsArr = [...jobs];
    while (jobsArr.length < 25) {
      jobsArr.push({job_number:"", model_number:"", serial_number:"", volage:"", leads:""});
    }
    return jobsArr;
  };

  let class1 = 'job-book-table-job-item';
  let class2 = 'job-book-table-job-item job-book-table-job-item-v1';

  return (
    <div className="job-book-table">
      <div className="job-book-table-headers">
        <div className="job-book-table-serial-number-header">Serial Number</div>
        <div className="job-book-table-job-number-header">Job Number</div>
        <div className="job-book-table-model-number-header">Model Number</div>
        <div className="job-book-table-voltage-header">Voltage</div>
        <div className="job-book-table-stator-status-header">Stator Status</div>
        <div className="job-book-table-leads-header">Leads</div>
      </div>

      <div className="job-book-table-job-items">
        {filterJobs(jobs).map((job, i) => {
          return <div className={i%2==0? class1 : class2}>
            <div>job.serial_number</div>
            <div>job.job_number</div>
            <div>job.model_number</div>
            <div>job.voltage</div>
            <div>job.stator_status</div>
            <div>job.leads</div>
          </div>
        })}
      </div>
      
    </div>
  );
};

module.exports = DesktopJobBookTable;