const React = require('react');
const { TextField } = require('@mui/material');
const { useState } = require('react');

const DesktopNav = props => {

  const setQuery = () => {
    let query = document.querySelector('#desktop-nav-search').value;
    props.setQuery(query);
  };

  return (
    <nav className="desktop-nav">
      <div className="desktop-nav-logo-container">
        <div className="desktop-logo"></div>
        <div className="desktop-company-name-container">
          <div className="desktop-company-name">National Compressor</div>
          <div className="desktop-company-subname">Employee Interface</div>
        </div>
      </div>

      <div className="desktop-search-container">
        <input id="desktop-nav-search" label="Search" placeholder="Search" onChange={setQuery}/>
      </div>
    </nav>
  );
};

module.exports = DesktopNav;