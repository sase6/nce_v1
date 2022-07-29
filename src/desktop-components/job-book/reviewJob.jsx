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
  } = props;

  const [jobNumber, setJobNumber] = useState("AUTO");

  const setTheJobNumber = (e) => {
    if (isNaN(parseInt(e.target.value))) {
      setJobNumber('AUTO');
    } else {
      setJobNumber(parseInt(e.target.value));
    }
  };

  const parseData = (dataObj) => {
    //@MUST INCLUDE ALL PROPS
    let result = {};
    result.modelNumber = dataObj.modelNumber.toUpperCase();
    result.serialNumber = dataObj.serialNumber.toUpperCase();
    result.voltage = dataObj.voltage.toUpperCase();
    result.statorStatus = dataObj.statorStatus.toUpperCase();
    result.incomingNumber = dataObj.incomingNumber.toUpperCase();

    dataObj.ccHeater = dataObj.ccHeater.toUpperCase();
    result.ccHeater = (dataObj.ccHeater === 'Y' || dataObj.ccHeater === 'YES');
    result.scrap = dataObj.scrap;
    
    result.unloaders = parseInt(dataObj.unloaders),
    result.notes = dataObj.notes;
    result.enteredBy = dataObj.username.toLowerCase();

    return result;
  };

  const requestCreateJob = () => {
    axios({
      method: 'post',
      url: '/jobs/create',
      data: {...parseData({
        modelNumber, serialNumber,
        voltage, ccHeater,
        unloaders, statorStatus,
        incomingNumber, scrap,
        notes, username: user.username || 'SASE',
      }), jobNumber}
    })
    .then(response => {
      // Cancel and show Job Number
      let jobNumber = response.data.jobNumber;
      cancelHandler();
    })
    .catch(err => {
      // Show Error Message...
    });
  };


  const scrapMap = {
    true: {
      text: 'THIS IS SCRAP',
      class: 'job-book-review-scrap-text'
    },
    NO: {
      text: 'THIS IS NOT SCRAP',
      class: 'job-book-review-not-scrap-text'
    },
    Y: {
      text: 'THIS IS SCRAP',
      class: 'job-book-review-scrap-text'
    },
    false: {
      text: 'THIS IS NOT SCRAP',
      class: 'job-book-review-not-scrap-text'
    },
    ['']: {
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
          <div className={`job-book-review-scrap-status ${scrapMap[scrap].class}`}>{scrapMap[scrap].text}</div>
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