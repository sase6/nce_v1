const React = require('react');
// const axios = require('axios');
const { TextField, Button } = require('@mui/material');

const DeleteJobModal = (props) => {
  if (!props.render) return;
  
  const {user, setDeleteJobModal} = props;
  const deleteJob = () => {
    axios({
      method: 'delete',
      url: '/job',
      data: {
        jobNumber: document.getElementById('delete-job-modal-job-number').value,
        username: user.username,
        secretKey: document.getElementById('delete-job-modal-secret-key').value
      }
    })
    .then(() => {
      setDeleteJobModal(false);
    })
    .catch(err => err);
  };

  return (
    <div className="delete-job-modal-overlay">
      <div className="delete-job-modal">
        <div className="delete-job-modal-text">Delete A Job</div>

        <div className="delete-job-modal-input-container">
          <TextField id="delete-job-modal-job-number" label="Job Number" size="small" fullWidth/>
          <TextField id="delete-job-modal-secret-key" label="Secret Key" size="small" helperText="Only Admin Accounts Have Access" fullWidth sx={{width: '95%'}}/>
        </div>

        <div className="delete-job-modal-button-container">
         <Button sx={{color: 'red'}} onClick={() => setDeleteJobModal(false)} >Cancel</Button>
         <Button variant='outlined' 
          sx={{
            color: 'indianred'
          }}
          onClick={deleteJob}
         >Delete</Button>
        </div>
      </div>
    </div>
  );
};

module.exports = DeleteJobModal;