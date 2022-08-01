const React = require('react');
const { useState, useEffect } = require('react');
const { TextField, Fab, Chip } = require('@mui/material');
const axios = require('axios');
const CheckIcon  = require('@mui/icons-material/Check.js').default;
const CloseIcon = require('@mui/icons-material/Close.js').default;
const AddIcon = require('@mui/icons-material/Add.js').default;

const PendingUser = props => {
  const [isAddingVisibility, setIsAddingVisibility] = useState(false);

  const handleAddVisibility = () => {
    let isInputOpen = isAddingVisibility;
    let getNewAccessPage = () => document.querySelector(`#${props.user.username}-visibility-input`).value;

    if (isInputOpen && getNewAccessPage() !== '') {
      let visibilityArr = props.user.visibility;
      let payload = [...visibilityArr, getNewAccessPage()];
      axios({
        method: 'post',
        url: '/user/visibility/update',
        data: {
          username: props.user.username,
          set: {visibility: payload}
        }
      })
      .then(() => {
        props.fetchUsers();
      })
      .catch(err => {
        console.log('Error');
      });

      return;
    }
    setIsAddingVisibility(!isAddingVisibility);
  };

  const handleRemoveVisibility = (pageAccess) => {
    let currentVisibility = props.user.visibility;
    let indexOfRemove = currentVisibility.indexOf(pageAccess);
    currentVisibility.splice(indexOfRemove, 1);
    axios({
      method: 'post',
      url: '/user/visibility/update',
      data: {
        username: props.user.username,
        set: {visibility: currentVisibility}
      }
    })
    .then(() => {
      props.fetchUsers();
    })
    .catch(err => {
      console.log('Error');
    });
  };

  const addxremoveUser = (event, add=true) => {
    axios({
      method: 'post',
      url: add? '/user/accept':'/user/delete',
      data: {username: props.user.username}
    })
    .then(() => {
      props.fetchUsers();
    })
    .catch(err => {
      console.log('Error: ', err);
    });
  }

  return (
    <div className="pending-user-container">
      <div className="pending-user-top-container">
      <div className="pending-user-top-left-container">
        <TextField label="Username" variant="outlined" size="small" fullWidth defaultValue={props.user.username} disabled/>
        <TextField label="Password" variant="outlined" size="small" fullWidth type="password" defaultValue={props.user.password} disabled/>
      </div>
      <div className="pending-user-top-right-container">
        <div className="mui-close-icon" onClick={e => addxremoveUser(e, false)}>
          <Fab color="primary" aria-label="add"> <CloseIcon /> </Fab>
        </div>
        <div className="mui-check-icon" onClick={e => addxremoveUser(e)}>
          <Fab color="primary" aria-label="add"> <CheckIcon /> </Fab>
        </div>
      </div>
      </div>
      <div className="pending-user-bottom-container">
        <div className="pending-user-visibility-lists">
          <div className="pending-user-add-visibility" onClick={handleAddVisibility}><AddIcon/></div>
          <AddVisibilityComponent render={isAddingVisibility} setIsAddingVisibility={setIsAddingVisibility} user={props.user}/>
          {props.user.visibility.map((page, i) => { 
            if (page === 'Sign Out') return;    
            return <Chip key={`${Math.random()*100}-${i}-user`} label={page} variant="outlined" onDelete={() => {handleRemoveVisibility(page)}} size="small"/>
          })}
        </div>
      </div>
    </div>
  )
};

const AddVisibilityComponent = props => {
  if (!props.render) return;
  return (
    <input id={`${props.user.username}-visibility-input`} type="text" className="add-new-visibility"/>
  );
};

module.exports = PendingUser;