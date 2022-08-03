const React = require('react');
const { useState, useEffect } = require('react');
const { TextField, Button, InputLabelProps } = require('@mui/material');
const axios = require('axios');

const ReviewJob = props => {
  const {
    modelNumber,
    serialNumber,
    voltage,
    ccHeater,
    unloaders,
    statorStatus,
    incomingNumber,
    scrap,
    notes,
    toggleReviewingJob,
    cancelHandler,
    user,
    fetchAndSetJobRange,
    warranty
  } = props;

  const [jobNumber, setJobNumber] = useState("AUTO");

  const setTheJobNumber = (e) => {
    if (isNaN(parseInt(e.target.value))) {
      setJobNumber('AUTO');
    } else {
      setJobNumber(parseInt(e.target.value));
    }
  };

  const parseYesNoValues = (text) => {
    if (text === '?') return text;
    if (text.toUpperCase() === 'YES' || text.toUpperCase() === 'Y') return "YES";
    return 'NO';
  };

  const requestCreateJob = () => {
    axios({
      method: 'post',
      url: '/jobs/create',
      data: {
        enteredBy: user.username,
        modelNumber,
        serialNumber,
        voltage,
        ccHeater: parseYesNoValues(ccHeater),
        unloaders,
        statorStatus,
        incomingNumber,
        scrap: parseYesNoValues(scrap),
        notes,
        warranty: parseYesNoValues(warranty),
        jobNumber
      }
    })
    .then(response => {
      cancelHandler();
      fetchAndSetJobRange();
    })
    .catch(err => err);
  };

  const scrapMap = {
    YES: {
      text: 'THIS IS SCRAP',
      class: 'job-book-review-scrap-text'
    },
    NO: {
      text: 'THIS IS NOT SCRAP',
      class: 'job-book-review-not-scrap-text'
    },
    ['']: {
      text: '',
      class: ''
    },
    ['?']: {
      text: '',
      class: ''
    }
  };

  return (
    <div className="job-book-review-add-job-container">
      <div className="job-book-review-add-job-text">Review</div>

      <div className="job-book-review-model-x-serial-container">
        <TextField value={modelNumber} id="outlined-basic" label="Model Number" variant="outlined" disabled InputLabelProps={{ ...InputLabelProps, shrink: true }}/>
        <TextField value={serialNumber} id="outlined-basic" label="Serial Number" variant="outlined" disabled InputLabelProps={{ ...InputLabelProps, shrink: true }}/>
      </div>

      <div className="job-book-review-meta-information">
        <TextField value={voltage} disabled label="Voltage" fullWidth InputLabelProps={{ ...InputLabelProps, shrink: true }}/>
        <TextField value={unloaders} disabled label="Unloaders" fullWidth InputLabelProps={{ ...InputLabelProps, shrink: true }}/>
        <TextField value={ccHeater} disabled label="CC Heaters" fullWidth InputLabelProps={{ ...InputLabelProps, shrink: true }}/>
        <TextField value={statorStatus} disabled label="Stator Status" fullWidth InputLabelProps={{ ...InputLabelProps, shrink: true }}/>
      </div>

      <div className="job-book-review-additional-data">
        <div className="job-book-review-notes-container">
          <TextField value={notes} disabled label="Notes" rows="6" multiline fullWidth InputLabelProps={{ ...InputLabelProps, shrink: true }}/>
        </div>

        <div className="job-book-review-identification-numbers-x-scrap-status">
          <TextField value={incomingNumber} disabled label="Incoming Number" fullWidth InputLabelProps={{ ...InputLabelProps, shrink: true }}/>
          <TextField onKeyUp={setTheJobNumber} defaultValue={'AUTO'} label="Job Number" fullWidth InputLabelProps={{ ...InputLabelProps, shrink: true }}/>
          <div className="job-book-review-warranty-and-scrap-text">
            <div className={`job-book-review-scrap-status ${scrapMap[parseYesNoValues(scrap)].class}`}>{scrapMap[parseYesNoValues(scrap)].text}</div>
            <div className="job-book-review-warranty-text">{(warranty.toUpperCase()==="Y" || warranty.toUpperCase()==="YES")? "Warranty" : ""}</div>
          </div>
        </div>
      </div>

      <div className="job-book-review-buttons">
        <div className="job-book-review-cancel-x-go-back-button-container">
          <Button onClick={toggleReviewingJob}>Go Back</Button>
          <Button onClick={cancelHandler}>Cancel</Button>
        </div>
        <Button onClick={requestCreateJob}>Add Job</Button>
      </div>

    </div>
  );
};

module.exports = ReviewJob;