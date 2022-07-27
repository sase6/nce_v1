const React = require('react');
const { useState, useEffect } = require('react');
const { TextField, Select, MenuItem, Button } = require('@mui/material');


const DesktopExpandedJob = props => {
  const testJob = {
    job_number: 70100,
    model_number: '06DR8246BC3200',
    serial_number: '8trane903nnbw90',
    voltage: '208',
    leads: 10,
    entered_by: 'joe_weller69',
    entered_on: 'March 14th 2023',
    notes: 'The oil is leaking reallt bad at the side.'
  };

  const [startRange, setStartRange] = useState([]);
  const [ranges, setRanges] = useState(['0-1000', '1001-2000', '2001-3000', '3001-4000', '4001-5000']);
  const [totalJobs, setTotalJobs] = useState(1000);

  return <div className="desktop-job-book-expanded">
    <div className="desktop-job-book-range-container">
      <div className="desktop-job-book-total-showing">{totalJobs} Jobs</div>
      <div className="desktop-job-book-range-select-container">
      
      <select className="job-book-input-search-range">
        {ranges.map((range, i) => <option key={`jb_range-${i}`} value={range}>{range}</option> )}
      </select>

      </div>
    </div>
    <div className="desktop-job-book-deep-search-container">
      <div className="job-book-deep-search-input-container">
        <TextField id="job-book-input-deep-search" label="Search Database" variant="outlined" fullWidth/>
      </div>
      <Button variant="text">Search</Button>
    </div>
    <div className="desktop-job-book-job-number-container">
      <TextField id="job-book-input-job-number" label="Job Number" variant="outlined" disabled value={testJob.job_number} fullWidth/>
    </div>
    <div className="desktop-job-book-model-number-container">
      <TextField id="job-book-input-model-number" label="Model Number" variant="outlined" disabled value={testJob.model_number} fullWidth/>
    </div>
    <div className="desktop-job-book-serial-number-container">
      <TextField id="job-book-input-serial-number" label="Serial Number" variant="outlined" disabled value={testJob.serial_number} fullWidth/>
    </div>
    <div className="desktop-job-book-voltage-and-lead-container">
      <TextField id="job-book-input-voltage" label="Voltage" variant="outlined" disabled value={testJob.voltage} fullWidth/>
      <TextField id="job-book-input-leads" label="Leads" variant="outlined" disabled value={testJob.leads} fullWidth/> 
    </div>
    <div className="desktop-job-book-information-entry-container">
      <div>Entered by {testJob.entered_by}</div>
      <div>Entered on {testJob.entered_on}</div>
    </div>
    <div className="desktop-job-book-notes-container">
      <TextField id="job-book-input-notes" minRows="6" maxRows="6" label="Notes" variant="outlined" disabled multiline value={testJob.notes} fullWidth/> 
    </div>
    <div className="desktop-job-book-interactions-container">
      <Button variant="outlined">Delete Job</Button>
      <Button variant="outlined">Add Job</Button>
    </div>
  </div>
};

module.exports = DesktopExpandedJob;