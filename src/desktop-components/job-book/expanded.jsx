const React = require('react');
const { useState, useEffect } = require('react');
const { TextField, Select, MenuItem, Button, FormControl, InputLabel, InputLabelProps } = require('@mui/material');
const axios = require('axios');

const DesktopExpandedJob = props => {

  const {setAddJobModal, possibleRanges, focusedJob, filteredJobs, setSelectedRange, setJobs, fetchAndSetJobRange, setDeleteJobModal} = props;
  const [ranges, setRanges] = useState(['0-1000', '1001-2000', '2001-3000', '3001-4000', '4001-5000', '10000-11000']);
  const [totalJobs, setTotalJobs] = useState(filteredJobs.length || 0);
  const [jobRange, setJobRange] = useState('');
  const [textFieldSize, setTextFieldSize] = useState(window.innerWidth < 1550? 'small': 'medium');

  useEffect(() => setTotalJobs(filteredJobs.length), [filteredJobs]);

  useEffect(() => {
    let newRanges = [];
    possibleRanges.forEach(range => {
      newRanges.unshift(`${range[0]}-${range[1]}`);
    });
    setRanges(newRanges);
    //NEW
    setJobRange(newRanges[0]);
  }, [possibleRanges]);

  const rangeOnChangeHandler = (e) => {
    setJobRange(e.target.value);
    let range = e.target.value.split('-');
    range[0] = parseInt(range[0]);
    range[1] = parseInt(range[1]);
    setSelectedRange(range);
  };

  const onDeepSearch = () => {
    let query = document.getElementById('job-book-input-deep-search').value;
    if (query.length !== 0) {
      axios.get(`/jobs/${query}`)
      .then(response => {
        setJobs(response.data);
      })
      .catch(err => {
        console.log('Err: ', err);
      });
    }
  };

  const resetJobs = (e) => {
    let query = e.target.value;
    if (query.length <= 0) {
      fetchAndSetJobRange();
    }
  };

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
          onChange={rangeOnChangeHandler}
          style={{width: '90%'}}
          size={textFieldSize}
          InputLabelProps={{ ...InputLabelProps, shrink: true }}
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
        <TextField size={textFieldSize} id="job-book-input-deep-search" label="Search Database" variant="outlined" fullWidth onKeyUp={resetJobs}/>
      </div>
      <Button sx={{height: 55}} variant="text" onClick={onDeepSearch}>Search</Button>
    </div>
    <div className="desktop-job-book-job-number-container">
      <TextField size={textFieldSize} InputLabelProps={{ ...InputLabelProps, shrink: true }} id="job-book-input-job-number" label="Job Number" variant="outlined" disabled value={`${focusedJob.warranty === "YES"? "WARRANTY-": ""}${focusedJob.jobNumber}`} fullWidth error={focusedJob.scrap==="YES"} helperText={focusedJob.scrap==="YES"? 'This job has been scrapped!' : '' }/>
    </div>
    <div className="desktop-job-book-model-number-container">
      <TextField size={textFieldSize} InputLabelProps={{ ...InputLabelProps, shrink: true }} id="job-book-input-model-number" label="Model Number" variant="outlined" disabled value={focusedJob.modelNumber} fullWidth/>
    </div>
    <div className="desktop-job-book-serial-number-container">
      <TextField size={textFieldSize} InputLabelProps={{ ...InputLabelProps, shrink: true }} id="job-book-input-serial-number" label="Serial Number" variant="outlined" disabled value={focusedJob.serialNumber} fullWidth/>
    </div>
    <div className="desktop-job-book-voltage-and-lead-container">
      <TextField size={textFieldSize} InputLabelProps={{ ...InputLabelProps, shrink: true }} id="job-book-input-voltage" label="Voltage" variant="outlined" disabled value={focusedJob.voltage} fullWidth/>
      <TextField size={textFieldSize} InputLabelProps={{ ...InputLabelProps, shrink: true }} id="job-book-input-stator-status" label="Stator Status" variant="outlined" disabled value={focusedJob.statorStatus} fullWidth/> 
    </div>
    <div className="desktop-job-book-information-entry-container">
      <div>Entered by {focusedJob.enteredBy}</div>
      <div>Unloaders:  {focusedJob.unloaders}</div>
      <div>Entered on {focusedJob.enteredOn}</div>
      <div>CC Heater: <span className={`${focusedJob.ccHeater==="YES"? 'expanded-job-cc-heaters-text': 'expanded-job-cc-heaters-text-no'}`}>{focusedJob.ccHeater !== undefined? focusedJob.ccHeater : ""}</span></div>
    </div>
    <div className="desktop-job-book-notes-container">
      <TextField size={textFieldSize} InputLabelProps={{ ...InputLabelProps, shrink: true }} id="job-book-input-notes" minRows="6" maxRows="6" label="Notes" variant="outlined" disabled multiline value={focusedJob.notes} fullWidth/> 
    </div>
    <div className="desktop-job-book-interactions-container">
      <Button size={textFieldSize} variant="outlined" onClick={() => setDeleteJobModal(true)} >Delete Job</Button>
      <Button size={textFieldSize} variant="outlined" onClick={() => setAddJobModal(true)}>Add Job</Button>
    </div>
  </div>
};

module.exports = DesktopExpandedJob;