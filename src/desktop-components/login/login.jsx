const React = require('react');
const { useState } = require('react');
const { TextField, Button } = require('@mui/material');

const Login = props => {
  const [usernameValidationError, setUsernameValidationError] = useState(false);
  const [passwordValidationError, setPasswordValidationError] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateInputs = (username, password) => {
    if (username.length <= 0) {
      setUsernameValidationError(true);
      setUsernameError('Please do not leave blank');
    }
    if (password.length <= 0) {
      setPasswordValidationError(true);
      setPasswordError('Please do not leave blank');
    }

    if (username.length <= 0 || password.length <= 0) return;
    setUsernameValidationError(false);
    setPasswordValidationError(false);
    setUsernameError('');
    setPasswordError('');
    return true;
  };

  const login = () => {
    let username = document.querySelector('#desktop-username-login').value;
    let password = document.querySelector('#desktop-password-login').value;
    if (!validateInputs(username, password)) return;

    console.log({username, password});
  };

  return (
    <div>
      <div className="desktop-login-form-container">
        <h1 className={'desktop-login-text'}>NCE Login</h1>
        <TextField id="desktop-username-login" label="Username" variant="outlined" className={'desktop-username-login'} required fullWidth size={'small'} error={usernameValidationError} helperText={usernameError}/>
        <TextField id="desktop-password-login" label="Password" variant="outlined" className={'desktop-password-login'} required fullWidth size={'small'} error={passwordValidationError} helperText={passwordError}/>
        <div className="desktop-login-button-container">
          <Button variant="outlined" className={'desktop-login-page-button desktop-login-button'} onClick={login}>Login</Button>
          <Button variant="outlined" className={'desktop-login-page-button desktop-signup-button'} >Create Account</Button>
        </div>
      </div>
    </div>
  );
};

module.exports = Login;