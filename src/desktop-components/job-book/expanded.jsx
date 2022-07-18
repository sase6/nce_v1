const React = require('react');
const { useState, useEffect } = require('react');
const { TextField, Select, MenuItem } = require('@mui/material');

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

  return <div className="desktop-job-book-expanded">
    <div className="desktop-job-book-range-container">
      <div className="desktop-job-book-total-showing">1000</div>
      <div className="desktop-job-book-range-select-container">
      
      <select>
        <option value="">yuh</option>
      </select>

      </div>
    </div>
    <div className="desktop-job-book-deep-search-container"></div>
    <div className="desktop-job-book-job-number-container"></div>
    <div className="desktop-job-book-model-number-container"></div>
    <div className="desktop-job-book-serial-number-container"></div>
    <div className="desktop-job-book-voltage-and-lead-container"></div>
    <div className="desktop-job-book-voltage-entry-container"></div>
    <div className="desktop-job-book-notes-container"></div>
  </div>
};

module.exports = DesktopExpandedJob;