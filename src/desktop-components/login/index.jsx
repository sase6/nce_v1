const React = require('react');
const Login = require('./login.jsx');

const DesktopLoginPage = props => {
  if (props.page !== 'login') return;
  return (
    <div className={'desktop-login-page-container'}>
      <Login setUser={props.setUser}/>
    </div>
  );
};

module.exports = DesktopLoginPage;