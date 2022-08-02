const React = require('react');
const { useState, useEffect } = require('react');
const SectionComponent = require('./sectionComponent.jsx');
const { TextField, Button, FormControl, Select, MenuItem, InputLabel } = require('@mui/material');

const Settings = props => {

  const [backupInterval, setBackupInterval] = useState(1800000);
  const handleBackupIntervalChange = (e) => setBackupInterval(e.target.value);

  return (
    <div className="desktop-admin-subtree desktop-admin-settings">
      <div className="desktop-admin-section-title-container">
        Settings
      </div>

      <div className="desktop-admin-section-body-container">
        <SectionComponent render={true} text="Account"/>
        <TextField label="Username" disabled value="SaseForTest" size="small" sx={{width: '28vw'}}/>
        <TextField type="password" label="Password" disabled value="fqjeqniwoneoiqwnncocqenoqiwnd" size="small" sx={{width: '28vw'}}/>
        <Button sx={{width: 'max-content', padding: '5px 0 5px 0', fontSize: '12px'}}>Reset Password</Button>
        <TextField type="password" label="Secret Key" disabled value="fqjeqniwoneoiqwnncocqenoqiwnd" size="small" sx={{width: '28vw'}}/>
        <Button sx={{width: 'max-content', padding: '5px 0 5px 0', fontSize: '12px'}}>Generate Secret Key</Button>
        <SectionComponent render={true} text="Security"/>
        <TextField label="Backup Path" disabled value="@root/backup/jobs.xlsx" size="small" sx={{width: '28vw'}} helperText="Last Backed up on 06/20/2022 10:18:10am"/>
        <FormControl fullWidth>
          <InputLabel id="select-job-backup-time-label">Backup Interval</InputLabel>
          <Select
            labelId="select-job-backup-time-label"
            id="select-job-book-backup-time"
            value={backupInterval}
            label="Backup Interval"
            onChange={handleBackupIntervalChange}
            size="small"
            sx={{width: '300px'}}
          >
            <MenuItem value={"1800000"}>Bi-Hourly</MenuItem>
            <MenuItem value={"3600000"}>Hourly</MenuItem>
            <MenuItem value={"43200000"}>Bi-Daily</MenuItem>
          </Select>
      </FormControl>
      <Button
        size="small"
        sx={{
          width: '300px',
          background: 'rgba(0,0,0,0.85)',
          color: 'white',
          boxSizing: 'border-box',
          padding: '10px',
          '&:hover': {
            background: 'rgba(0,0,0,0.95)'
          }
        }}
      >
        Download Job Book
      </Button>
      </div>

    </div>
  );
};

module.exports = Settings;