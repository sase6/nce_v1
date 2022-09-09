const React = require('react');
const { useState, useEffect } = require('react');
const { Button, FormControl, InputLabel, Select, MenuItem } = require('@mui/material');

module.exports = (props) => {
  const {query, paperworkName, setPaperworkName, currentJobNumber, setCurrentJobNumber} = props;
  const increaseJobNumber = () => setCurrentJobNumber(currentJobNumber + 1);
  const decreaseJobNumber = () => setCurrentJobNumber(currentJobNumber - 1);

  useEffect(() => {
    if (query !== '' && query) setCurrentJobNumber(parseInt(query) || currentJobNumber);
  }, [query]);
  
  return (
    <div className='paperworks-toolbar'>
      <div className="paperworks-toolbar-left-float">
        <div className="paperworks-toolbar-sheet-selector">
          <FormControl fullWidth size='small'>
            <InputLabel id="paperworks-select-label">Paperwork Name</InputLabel>
            <Select
              size='small'
              labelId="paperworks-select-label"
              value={paperworkName}
              label="Paperwork Name"
              onChange={(e) => setPaperworkName(e.target.value)}
            >
              <MenuItem value={'p1'}>PROCEDURE TO QUALIFYING STATOR IRONS FOR REWINDING</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="paperworks-toolbar-save-button">
          <Button size='small' sx={{height: '39px'}} variant="outlined">SAVE</Button>
        </div>
      </div>

      <div className="paperworks-toolbar-right-float">
        <Button sx={{minWidth: 0, width: 35, borderRadius: 100, background: 'rgba(0,0,0,0.015)', color: 'rgba(0,0,0,0.85)'}} onClick={decreaseJobNumber}>{"<"}</Button>
        <div className="paperworks-toolbar-job-number-text" aria-readonly>{currentJobNumber}</div>
        <Button sx={{minWidth: 0, width: 35, borderRadius: 100, background: 'rgba(0,0,0,0.015)', color: 'rgba(0,0,0,0.85)'}} onClick={increaseJobNumber}>{">"}</Button>
      </div>
    </div>
  );
};