const React = require('react');
const { useState, useEffect } = require('react');
const Login = require('./login.jsx');
const Signup = require('./signup.jsx');

const DesktopLoginPage = props => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={'desktop-login-page-container'}>
      <Login isLogin={isLogin} setIsLogin={setIsLogin}/>
      {/* <Signup isLogin={isLogin} setIsLogin={setIsLogin}/> */}
    </div>
  );
};

module.exports = DesktopLoginPage;