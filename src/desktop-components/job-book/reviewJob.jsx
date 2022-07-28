const React = require('react');
const { useState, useEffect } = require('react');
const { TextField, Button, InputLabelProps } = require('@mui/material');

const ReviewJob = props => {

  const scrap = false;

  const scrapMap = {
    true: {
      text: 'THIS IS SCRAP',
      class: 'job-book-review-scrap-text'
    },
    false: {
      text: 'THIS IS NOT SCRAP',
      class: 'job-book-review-not-scrap-text'
    }
  };

  return (
    <div className="job-book-review-add-job-container">
      <div className="job-book-review-add-job-text">Review</div>

      <div className="job-book-review-model-x-serial-container">
        <TextField id="outlined-basic" label="Outlined" variant="outlined" disabled InputLabelProps={{ ...InputLabelProps, shrink: true }}/>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" disabled InputLabelProps={{ ...InputLabelProps, shrink: true }}/>
      </div>

      <div className="job-book-review-meta-information">
        <TextField disabled label="Voltage" fullWidth InputLabelProps={{ ...InputLabelProps, shrink: true }}/>
        <TextField disabled label="Unloaders" fullWidth InputLabelProps={{ ...InputLabelProps, shrink: true }}/>
        <TextField disabled label="CC Heaters" fullWidth InputLabelProps={{ ...InputLabelProps, shrink: true }}/>
        <TextField disabled label="Stator Status" fullWidth InputLabelProps={{ ...InputLabelProps, shrink: true }}/>
      </div>

      <div className="job-book-review-additional-data">
        <div className="job-book-review-notes-container">
          <TextField disabled label="Notes" rows="6" minRows="6" maxRows="6" multiline fullWidth InputLabelProps={{ ...InputLabelProps, shrink: true }}/>
        </div>

        <div className="job-book-review-identification-numbers-x-scrap-status">
          <TextField disabled label="Serial Number" fullWidth InputLabelProps={{ ...InputLabelProps, shrink: true }}/>
          <TextField disabled label="Serial Number" fullWidth InputLabelProps={{ ...InputLabelProps, shrink: true }}/>
          <div className={`job-book-review-scrap-status ${scrapMap[scrap].class}`}>{scrapMap[scrap].text}</div>
        </div>
      </div>

      <div className="job-book-review-buttons">
        <div className="job-book-review-cancel-x-go-back-button-container">
          <Button>Go Back</Button>
          <Button>Cancel</Button>
        </div>
        <Button>Add Job</Button>
      </div>

    </div>
  );
};

module.exports = ReviewJob;