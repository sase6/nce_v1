const React = require('react');
const { useState } = require('react');
const { TextField, Button } = require('@mui/material');

const Login = props => {
  return (
    <div>
      <div className="desktop-login-form-container">
        <h1 className={'desktop-login-text'}>NCE Login</h1>
        <TextField id="outlined-basic" label="Username" variant="outlined" className={'desktop-username-login'} required fullWidth size={'small'} />
        <TextField id="outlined-basic" label="Password" variant="outlined" className={'desktop-password-login'} required fullWidth size={'small'}/>
        <div className="desktop-login-button-container">
          <Button variant="outlined" className={'desktop-login-page-button desktop-login-button'}>Login</Button>
          <Button variant="outlined" className={'desktop-login-page-button desktop-signup-button'}>Create Account</Button>
        </div>
      </div>
    </div>
  );
};

module.exports = Login;