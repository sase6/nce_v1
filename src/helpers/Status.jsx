const React = require('react');
const {useEffect} = require('react');
const { Alert } = require('@mui/material');
var timeout = null;

module.exports = ({val, set}) => {
  if (val === null) return;

  useEffect(() => {
    if (timeout !== null) clearTimeout(timeout);

    setTimeout(() => {
      document.querySelector('.system-status').style.animation = "350ms status_fly_more_left forwards";

      timeout = setTimeout(() => {
        set(null);
        timeout = null;
      }, 350);
    }, 1500);
  }, []);

  return (
    <div className="system-status">
      <Alert variant='filled' severity={val.type}>{val.msg}</Alert>
    </div>
  );
};