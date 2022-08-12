const React = require('react');
const { useState, useEffect } = require('react');

const DesktopJobBookTable = props => {

  const {jobs, setFocusedJob} = props;
  const [tableJobs, setTableJobs] = useState(jobs);

  const padJobs = jobs => {
    let jobsArr = [...jobs];
    while (jobsArr.length < 25) {
      jobsArr.push({});
    }
    return jobsArr;
  };

  useEffect(() => setTableJobs(padJobs(jobs)), [jobs]);

  let class1 = 'job-book-table-job-item';
  let class2 = 'job-book-table-job-item job-book-table-job-item-v1';

  return (
    <div className="job-book-table">
      <div className="job-book-table-headers">
        <div className="job-book-table-job-number-header">Job Number</div>
        <div className="job-book-table-model-number-header">Model Number</div>
        <div className="job-book-table-serial-number-header">Serial Number</div>
        <div className="job-book-table-voltage-header">Voltage</div>
        <div className="job-book-table-warranty-header">Warranty</div>
        <div className="job-book-table-unloaders-header">Unloaders</div>
        <div className="job-book-table-stator-status-header">Stator Status</div>
        <div className="job-book-table-incoming-number-header">Incoming #</div>
        <div className="job-book-table-scrapped?-header">Scrap?</div>
      </div>

      <div className="job-book-table-job-items">
        {tableJobs.map((job, i) => {
          let scrap = job.scrap === undefined? '' : job.scrap==='YES'? 'SCRAP' : '';

          return <div key={'test_fake_val-'+i} className={i%2==0? class1 : class2} onClick={() => setFocusedJob(job)}>
            <div className={`job-table-item-${i} ${job.warranty==="YES"? 'goldenrod-text' : ''}`} >{job.jobNumber}</div>
            <div>{job.modelNumber}</div>
            <div>{job.serialNumber}</div>
            <div>{job.voltage}</div>
            <div>{job.warranty}</div>
            <div>{job.unloaders}</div>
            <div className={`job-table-stator-status-text-${job.statorStatus==='GOOD'? 'green' : 'red'}`} >{job.statorStatus}</div>
            <div>{job.incomingNumber}</div>
            <div className='job-book-scrapped-column' >{scrap}</div>
          </div>
        })}
      </div>
      
    </div>
  );
};

module.exports = DesktopJobBookTable;