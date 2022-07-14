const React = require('react');
const { useState, useEffect } = require('react');
const { TextField, Fab, Chip } = require('@mui/material');
const CheckIcon  = require('@mui/icons-material/Check.js').default;
const CloseIcon = require('@mui/icons-material/Close.js').default;
const AddIcon = require('@mui/icons-material/Add.js').default;

const PendingUser = props => {
  const [isAddingVisibility, setIsAddingVisibility] = useState(false);

  return (
    <div className="pending-user-container">
      <div className="pending-user-top-container">
      <div className="pending-user-top-left-container">
        <TextField id="outlined-basic" label="Username" variant="outlined" size="small" fullWidth defaultValue={props.user.username} disabled/>
        <TextField id="outlined-basic" label="Password" variant="outlined" size="small" fullWidth type="password" defaultValue={props.user.password} disabled/>
      </div>
      <div className="pending-user-top-right-container">
        <div className="mui-close-icon">
          <Fab color="primary" aria-label="add"> <CloseIcon /> </Fab>
        </div>
        <div className="mui-check-icon">
          <Fab color="primary" aria-label="add"> <CheckIcon /> </Fab>
        </div>
      </div>
      </div>
      <div className="pending-user-bottom-container">
        <div className="pending-user-visibility-lists">
          <div className="pending-user-add-visibility" onClick={e => setIsAddingVisibility(!isAddingVisibility)}><AddIcon/></div>
          {/* <Chip label="Deletable" variant="outlined" onDelete={handleDelete} /> */}
          <AddVisibilityComponent render={isAddingVisibility} setIsAddingVisibility={setIsAddingVisibility}/>
          {props.user.visibility.map((page, i) => { 
            if (page === 'Sign Out') return;    
            return <Chip key={`${Math.random()*100}-${i}-user`} label={page} variant="outlined" onDelete={() => {}} size="small"/>
          })}
        </div>
      </div>
    </div>
  )
};

const AddVisibilityComponent = props => {
  if (!props.render) return;
  return (
    <input type="text" className="add-new-visibility" />
  );
};

module.exports = PendingUser;