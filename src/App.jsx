const React = require('react');
const {useState, useEffect} = require('react');
const DesktopLoginPage = require('./desktop-components/login/index.jsx');
const DesktopNav = require('./desktop-components/navigation/desktopNav.jsx');

const App = () => {
  return (
    <div className="app">
      <DesktopNav />

      <div className="main-content">
        <DesktopLoginPage />
      </div>
    </div>
  );
};

module.exports = App;
