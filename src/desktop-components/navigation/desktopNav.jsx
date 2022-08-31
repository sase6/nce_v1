const React = require('react');
const axios = require('axios');
const { TextField } = require('@mui/material');
const { useState } = require('react');

const allPages = ['Admin', 'Job Book', 'Paperwork'];

const orderPages = (pages) => {
  let result = [];
  allPages.forEach(page => (pages.indexOf(page) !== -1)? result.push(page) : '' );
  return result;
};

const DesktopNav = props => {

  const {page, pages, setPage} = props;

  const setQuery = () => {
    let query = document.querySelector('#desktop-nav-search').value.toUpperCase();
    props.setQuery(query);
  };

  const setNewPage = (e) => {
    const pageName = e.target.value;
    if (pageName === 'Sign Out') {
      axios.get('/signout')
      .then(() => {
        setPage('Login');
        e.target.value=page;
      });
      return;
    }
    setPage(pageName);
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

      <RenderSearchBar page={page} setQuery={setQuery} setNewPage={setNewPage} pages={pages}/>
    </nav>
  );
};

const RenderSearchBar = props => {
  if(props.page === 'Login') return;
  const {setQuery, setNewPage, pages} = props;

  return (
    <div className="nav-search-bar">
        <select name="" id="" className="nav-page-selector" onChange={setNewPage} >
          {orderPages(pages).map((page, i) => {
            return (
              <option key={`user-pages-select-${i}`} value={page}>{page}</option>
            );
          })}
          <option value={"Sign Out"}>Sign Out</option>
        </select>
        <div className="desktop-search-container">
          <input id="desktop-nav-search" label="Search" placeholder="Search" onChange={setQuery}/>
        </div>
      </div>
  );
};

module.exports = DesktopNav;