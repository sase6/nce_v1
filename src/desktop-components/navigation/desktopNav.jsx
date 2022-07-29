const React = require('react');
const { TextField } = require('@mui/material');
const { useState } = require('react');

const DesktopNav = props => {

  const {page} = props;

  const setQuery = () => {
    let query = document.querySelector('#desktop-nav-search').value.toUpperCase();
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

      <RenderSearchBar page={page} setQuery={setQuery}/>
    </nav>
  );
};

const RenderSearchBar = props => {
  console.log(props.page);
  if(props.page === 'Login') return;
  const {setQuery} = props;
  console.log('return');

  return (
    <div className="desktop-search-container">
      <input id="desktop-nav-search" label="Search" placeholder="Search" onChange={setQuery}/>
    </div>
  );
};

module.exports = DesktopNav;