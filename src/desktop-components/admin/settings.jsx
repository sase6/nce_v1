const React = require('react');
const { useState, useEffect } = require('react');
const SectionComponent = require('./sectionComponent.jsx');
const { TextField, Button, FormControl, Select, MenuItem, InputLabel } = require('@mui/material');
const axios = require('axios');

const Settings = props => {

  const { user } = props;
  const [backupInterval, setBackupInterval] = useState(1800000);
  const [secretKey, setSecretKey] = useState('');
  const [secretKeyHelperText, setSecretKeyHelperText] = useState("Click to Copy");
  const [isPasswordDisabled, setIsPasswordDisabled] = useState(true);
  const handleBackupIntervalChange = (e) => setBackupInterval(e.target.value);

  const onPasswordChange = (e) => {
    if (isPasswordDisabled) {
      e.target.innerText = "Save Password";
      setIsPasswordDisabled(!isPasswordDisabled);
      document.getElementById('admin-user-password-input').value = "";
      document.getElementById('admin-user-password-input').disabled = false;
      document.getElementById('admin-user-password-input').focus();
    } else {
      axios({
        method: 'post',
        url: '/user/password/reset',
        data: {
          username: user.username,
          password: document.getElementById('admin-user-password-input').value
        }
      })
      .then(() => {
        setIsPasswordDisabled(!isPasswordDisabled);
        document.getElementById('admin-user-password-input').disabled = true;
        e.target.innerText = "Reset Password";
      })
      .catch(err => err);
    }
  };

  const fetchSecretKey = () => {
    axios.get('/secretKey')
    .then((response) => setSecretKey(response.data))
    .catch(err => err);
  };

  useEffect(() => {
    document.getElementById('admin-user-password-input').disabled = true;
    fetchSecretKey();
  }, []);

  return (
    <div className="desktop-admin-subtree desktop-admin-settings">
      <div className="desktop-admin-section-title-container">
        Settings
      </div>

      <div className="desktop-admin-section-body-container">
        <SectionComponent render={true} text="Account"/>
        
        <div className="desktop-admin-account-container">
          <TextField label="Username" disabled value={user.username} size="small" sx={{width: '28vw'}}/>
          <TextField id="admin-user-password-input" type="password" label="Password" defaultValue="passwordIsUnreadable" size="small" sx={{width: '28vw'}}/>
          <Button sx={{width: 'max-content', padding: '0px 0 0px 0', fontSize: '12px'}} onClick={onPasswordChange}>Reset Password</Button>
          <TextField id="admin-secret-key-input" type="password" helperText={secretKeyHelperText} label="Secret Key" disabled value={secretKey} size="small" sx={{width: '28vw', '&:hover': {cursor: 'pointer'}}} onClick={e => {
            window.navigator.clipboard.writeText(e.target.value);
            setSecretKeyHelperText("Copied!");
            setTimeout(() => setSecretKeyHelperText("Click to Copy!"), 3000);
          }}/>
          <Button sx={{width: 'max-content', padding: '0px 0 0px 0', fontSize: '12px'}} onClick={fetchSecretKey}>Fetch Secret Key</Button>
        </div>

        <SectionComponent render={true} text="Security"/>

        <div className="desktop-admin-account-backup-container">
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
          <a href="/backup/jobs.xlsx" download>Download Job Book</a>
        </Button>
        </div>
      </div>

    </div>
  );
};

module.exports = Settings;