const React = require('react');
const Login = require('./login.jsx');

const DesktopLoginPage = props => {
  return (
    <div className={'desktop-login-page-container'}>
      <Login/>
    </div>
  );
};

module.exports = DesktopLoginPage;