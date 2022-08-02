const React = require('react');
const { useState, useEffect } = require('react');
const { TextField, Button } = require('@mui/material');
const axios = require('axios');

const DeletedLog = (props) => {

  const fake = {
    jobNumber: '70100',
    modelNumber: '06DS8246BC3200',
    serialNumber: 'FO9W((FNWO&8DSA',
    voltage: '460',
    ccHeater: true,
    unloaders: 1,
    statorStatus: 'GOOD',
    incomingNumber: '4238039',
    scrap: false,
    notes: "N/A",
    enteredOn: "06/20/2002",
    enteredBy: "brandon",
    deletedOn: "05/21/2022",
    deletedBy: "dev",
    _isDeleted: "true",
    warranty: false
  };

  const [deletedLog, setDeletedLog] = useState([]);

  const fetchDeletedLog = () => {
    axios.post('/jobs/deleted')
    .then(response => {
      console.log(response.data);
      setDeletedLog(response.data);
    })
    .catch(err => {
      console.log('Err: ', err);
    });
  };

  useEffect(() => {
    fetchDeletedLog();
  }, []);

  return (
    <div className="admin-deleted-log">
      {deletedLog.map((job, i) => {
        job.ccHeater = job.ccHeater === true?  job.ccHeater = "Yes" : 'No';
        job.scrap = job.scrap === true? job.scrap = "SCRAP" : 'Not Scrap';
        return (
          <div className="admin-deleted-log-item" key={`admin-deleted-log-item-${i}`}>
            <TextField value={job.jobNumber} disabled label="Job Number" fullWidth size="small"/>
            <TextField value={job.modelNumber} disabled label="Model Number" fullWidth size="small"/>
            <TextField value={job.serialNumber} disabled label="Serial Number" fullWidth size="small"/>
            <TextField value={job.incomingNumber} disabled label="Incoming Number" fullWidth size="small"/>
            <div className="admin-deleted-jobs-grouped-smalltext">
              <TextField value={job.voltage} disabled label="Voltage" fullWidth size="small"/>
              <TextField value={job.ccHeater} disabled label="ccHeater" fullWidth size="small"/>
            </div>
            <div className="admin-deleted-jobs-grouped-smalltext">
              <TextField value={job.unloaders} disabled label="Unloaders" fullWidth size="small"/>
              <TextField value={job.scrap} disabled label="Scrap" fullWidth size="small"/>
            </div>
            <TextField value={job.statorStatus} disabled label="Stator Status" fullWidth size="small"/>

            <div className="admin-deleted-jobs-grouped-smalltext">
              <TextField value={job.enteredOn} disabled label="Entered On" fullWidth size="small"/>
              <TextField value={job.enteredBy} disabled label="Entered By" fullWidth size="small"/>
            </div>
            <TextField value={job.notes} disabled label="Notes" fullWidth size="small"/>
            <div className="admin-deleted-jobs-grouped-smalltext">
              <TextField value={job.deletedOn} disabled label="Entered On" fullWidth size="small"/>
              <TextField value={job.deletedBy} disabled label="Entered By" fullWidth size="small"/>
            </div>
            <div className="admin-item-button-interactions">
              <Button sx={{color: 'indianred'}}>Delete</Button>
              <Button sx={{color: 'limegreen'}}>Restore</Button>
            </div>

          </div>
        );
      })}
    </div>
  );
};

module.exports = DeletedLog;