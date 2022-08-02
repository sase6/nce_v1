const React = require('react');
const { useState, useEffect } = require('react');
const DeletedLog = require('./deletedLog.jsx');

const RemovedLog = props => {
  return (
    <div className="desktop-admin-subtree desktop-admin-remove-log">
      <div className="desktop-admin-section-title-container">
        Deleted Log
      </div>

      <div className="desktop-admin-section-body-container">
        <DeletedLog />
      </div>
    </div>
  );
};

module.exports = RemovedLog;