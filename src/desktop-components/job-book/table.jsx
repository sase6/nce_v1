const React = require('react');
const { useState, useEffect } = require('react');

const DesktopJobBookTable = props => {
  // props.jobs ===

  const [jobs, setjobs] = useState([]);

  const filterJobs = jobs => {
    let jobsArr = [...jobs];
    while (jobsArr.length < 25) {
      jobsArr.push({job_number:"70100", model_number:"06DS8246BC3600", serial_number:"EUIN83NWU92WW", voltage:"460", leads:"8", status: 'GOOD', incoming_number: '801001', cc_header: 'Yes', unloaders: 2, 'scrapped?': 'SCRAP'});
    }
    return jobsArr;
  };

  let class1 = 'job-book-table-job-item';
  let class2 = 'job-book-table-job-item job-book-table-job-item-v1';

  return (
    <div className="job-book-table">
      <div className="job-book-table-headers">
        <div className="job-book-table-job-number-header">Job Number</div>
        <div className="job-book-table-model-number-header">Model Number</div>
        <div className="job-book-table-serial-number-header">Serial Number</div>
        <div className="job-book-table-voltage-header">Voltage</div>
        <div className="job-book-table-cc-header-header">CC Header</div>
        <div className="job-book-table-unloaders-header">Unloaders</div>
        <div className="job-book-table-stator-status-header">Stator Status</div>
        <div className="job-book-table-incoming-number-header">Incoming #</div>
        <div className="job-book-table-scrapped?-header">Scrap?</div>
      </div>

      <div className="job-book-table-job-items">
        {filterJobs(jobs).map((job, i) => {
          return <div key={'test_fake_val-'+i} className={i%2==0? class1 : class2}>
            <div>{job.job_number}</div>
            <div>{job.model_number}</div>
            <div>{job.serial_number}</div>
            <div>{job.voltage}</div>
            <div>{job.cc_header}</div>
            <div>{job.unloaders}</div>
            <div>{job.status}</div>
            <div>{job.incoming_number}</div>
            <div className='job-book-scrapped-column' >{job['scrapped?']}</div>
          </div>
        })}
      </div>
      
    </div>
  );
};

module.exports = DesktopJobBookTable;