const React = require('react');
const { useState, useEffect } = require('react');
const { TextField, Select, MenuItem, Button, FormControl, InputLabel } = require('@mui/material');


const DesktopExpandedJob = props => {
  const testJob = {
    job_number: 70100,
    model_number: '06DR8246BC3200',
    serial_number: '8trane903nnbw90',
    voltage: '208',
    leads: 10,
    entered_by: 'joe_weller69',
    entered_on: 'March 14th 2023',
    stator_status: 'GOOD',
    notes: 'The oil is leaking reallt bad at the side.'
  };

  const {setAddJobModal, possibleRanges} = props;
  const [startRange, setStartRange] = useState([]);
  const [ranges, setRanges] = useState(['0-1000', '1001-2000', '2001-3000', '3001-4000', '4001-5000', '10000-11000']);
  const [totalJobs, setTotalJobs] = useState(1000);
  const [jobRange, setJobRange] = useState('');
  const [focusedJob, setFocusedJob] = useState(testJob);

  useEffect(() => {
    let newRanges = [];
    possibleRanges.forEach(range => {
      newRanges.push(`${range[0]}-${range[1]}`);
    });
    setRanges(newRanges);
  }, [possibleRanges]);

  return <div className="desktop-job-book-expanded">
    <div className="desktop-job-book-range-container">
      <div className="desktop-job-book-total-showing">{totalJobs} Jobs</div>
      <div className="desktop-job-book-range-select-container">
      
      <FormControl fullWidth>
        <InputLabel id="job-range-value-label">Job Range</InputLabel>
        <Select
          labelId="job-range-value-label"
          id="jobRangeValue"
          value={jobRange}
          label="Job Range"
          onChange={e => setJobRange(e.target.value)}
          style={{width: '150px'}}
          >
            {ranges.map((range, i) => 
              <MenuItem key={`jb_range-${i}`} value={range}>{range}</MenuItem> 
            )}
        </Select>
      </FormControl>

      </div>
    </div>
    <div className="desktop-job-book-deep-search-container">
      <div className="job-book-deep-search-input-container">
        <TextField id="job-book-input-deep-search" label="Search Database" variant="outlined" fullWidth/>
      </div>
      <Button sx={{height: 55}} variant="text">Search</Button>
    </div>
    <div className="desktop-job-book-job-number-container">
      <TextField id="job-book-input-job-number" label="Job Number" variant="outlined" disabled value={focusedJob.job_number} fullWidth error helperText="This has been Scrapped!"/>
    </div>
    <div className="desktop-job-book-model-number-container">
      <TextField id="job-book-input-model-number" label="Model Number" variant="outlined" disabled value={focusedJob.model_number} fullWidth/>
    </div>
    <div className="desktop-job-book-serial-number-container">
      <TextField id="job-book-input-serial-number" label="Serial Number" variant="outlined" disabled value={focusedJob.serial_number} fullWidth/>
    </div>
    <div className="desktop-job-book-voltage-and-lead-container">
      <TextField id="job-book-input-voltage" label="Voltage" variant="outlined" disabled value={focusedJob.voltage} fullWidth/>
      <TextField id="job-book-input-stator-status" label="Stator Status" variant="outlined" disabled value={focusedJob.stator_status} fullWidth/> 
    </div>
    <div className="desktop-job-book-information-entry-container">
      <div>Entered by {focusedJob.entered_by}</div>
      <div>Unloaders:  0</div>
      <div>Entered on {focusedJob.entered_on}</div>
      <div>CC Heaters: <span className="expanded-job-cc-heaters-text">Yes</span></div>
    </div>
    <div className="desktop-job-book-notes-container">
      <TextField id="job-book-input-notes" minRows="6" maxRows="6" label="Notes" variant="outlined" disabled multiline value={focusedJob.notes} fullWidth/> 
    </div>
    <div className="desktop-job-book-interactions-container">
      <Button variant="outlined">Delete Job</Button>
      <Button variant="outlined" onClick={() => setAddJobModal(true)}>Add Job</Button>
    </div>
  </div>
};

module.exports = DesktopExpandedJob;