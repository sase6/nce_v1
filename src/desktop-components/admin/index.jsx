const React = require('react');
const { useState, useEffect } = require('react');
const Settings = require('./settings.jsx');
const Users = require('./users.jsx');
const RemovedLog = require('./removed-log.jsx');

const DesktopAdmin = props => {
  if (props.page !== 'Admin') return;

  return (
    <div className="desktop-admin-container">
      <Settings />
      <Users />
      <RemovedLog />
    </div>
  );
};

module.exports = DesktopAdmin;