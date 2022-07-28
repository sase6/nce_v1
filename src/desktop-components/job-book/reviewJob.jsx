const React = require('react');
const { useState, useEffect } = require('react');
const { TextField, Button, InputLabelProps } = require('@mui/material');

const ReviewJob = props => {

  const {
    modelNumber,
    serialNumber,
    voltage,
    ccHeaters,
    unloaders,
    statorStatus,
    incomingNumber,
    scrap,
    notes,
    toggleReviewingJob,
    cancelHandler
  } = props;

  console.log(props);


  const scrapMap = {
    YES: {
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
    N: {
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
        <TextField value={ccHeaters} disabled label="CC Heaters" fullWidth InputLabelProps={{ ...InputLabelProps, shrink: true }}/>
        <TextField value={statorStatus} disabled label="Stator Status" fullWidth InputLabelProps={{ ...InputLabelProps, shrink: true }}/>
      </div>

      <div className="job-book-review-additional-data">
        <div className="job-book-review-notes-container">
          <TextField value={notes} disabled label="Notes" rows="6" minRows="6" maxRows="6" multiline fullWidth InputLabelProps={{ ...InputLabelProps, shrink: true }}/>
        </div>

        <div className="job-book-review-identification-numbers-x-scrap-status">
          <TextField value={incomingNumber} disabled label="Incoming Number" fullWidth InputLabelProps={{ ...InputLabelProps, shrink: true }}/>
          <TextField value={'Auto'} label="Job Number" fullWidth InputLabelProps={{ ...InputLabelProps, shrink: true }}/>
          <div className={`job-book-review-scrap-status ${scrapMap[scrap].class}`}>{scrapMap[scrap].text}</div>
        </div>
      </div>

      <div className="job-book-review-buttons">
        <div className="job-book-review-cancel-x-go-back-button-container">
          <Button onClick={toggleReviewingJob}>Go Back</Button>
          <Button onClick={cancelHandler}>Cancel</Button>
        </div>
        <Button>Add Job</Button>
      </div>

    </div>
  );
};

module.exports = ReviewJob;