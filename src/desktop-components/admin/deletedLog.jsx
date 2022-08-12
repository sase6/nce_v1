const React = require('react');
const { useState, useEffect } = require('react');
const { TextField, Button } = require('@mui/material');
const axios = require('axios');

const DeletedLog = (props) => {
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

  const restoreJob = (jobNumber) => {
    axios({
      method: 'post',
      url: '/jobs/update/deleted',
      data: {jobNumber, del: false}
    })
    .then(() => fetchDeletedLog())
    .catch(err => err);
  };

  const deleteJob = (jobNumber) => {
    axios({
      method: 'post',
      url: '/jobs/delete',
      data: {jobNumber}
    })
    .then(() => fetchDeletedLog())
    .catch(err => err);
  };

  return (
    <div className="admin-deleted-log">
      {deletedLog.map((job, i) => {
        return (
          <div className="admin-deleted-log-item" key={`admin-deleted-log-item-${i}`}>
            <TextField value={job.jobNumber} disabled label="Job Number" fullWidth size="small"/>
            <TextField value={job.modelNumber} disabled label="Model Number" fullWidth size="small"/>
            <TextField value={job.serialNumber} disabled label="Serial Number" fullWidth size="small"/>
            <TextField value={job.incomingNumber} disabled label="Incoming Number" fullWidth size="small"/>
            <div className="admin-deleted-jobs-grouped-smalltext">
              <TextField value={job.voltage} disabled label="Voltage" fullWidth size="small"/>
              <TextField value={job.warranty} disabled label="Warranty" fullWidth size="small"/>
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
              <TextField value={job.deletedOn} disabled label="Deleted On" fullWidth size="small"/>
              <TextField value={job.deletedBy} disabled label="Deleted By" fullWidth size="small"/>
            </div>
            <div className="admin-item-button-interactions">
              <Button onClick={() => deleteJob(job.jobNumber)} sx={{color: 'indianred'}}>Delete</Button>
              <Button onClick={() => restoreJob(job.jobNumber)} sx={{color: 'limegreen'}}>Restore</Button>
            </div>

          </div>
        );
      })}
    </div>
  );
};

module.exports = DeletedLog;