const React = require('react');
const { TextField } = require('@mui/material');
const { useState } = require('react');

const DesktopNav = props => {

  const {page, pages} = props;

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

      <div className="nav-search-bar">
        <select name="" id="" className="nav-page-selector">
          {pages.map((page, i) => {
            return (
              <option key={`user-pages-select-${i}`} value={page}>{page}</option>
            );
          })}
          <option value={"Sign Out"}>Sign Out</option>
        </select>
        <RenderSearchBar page={page} setQuery={setQuery}/>
      </div>
    </nav>
  );
};

const RenderSearchBar = props => {
  if(props.page === 'Login') return;
  const {setQuery} = props;

  return (
    <div className="desktop-search-container">
      <input id="desktop-nav-search" label="Search" placeholder="Search" onChange={setQuery}/>
    </div>
  );
};

module.exports = DesktopNav;