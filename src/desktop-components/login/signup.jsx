const React = require('react');
const { useState } = require('react');
const { TextField } = require('@mui/material');

const Signup = props => {
  return (
    <div>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </div>
  );
};

module.exports = Signup;