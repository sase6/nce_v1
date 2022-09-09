const React = require('react');
const YesNoSelector = require('./YesNoSelector.jsx');
const { TextField, FormControl, InputLabel, Select, MenuItem } = require('@mui/material');

module.exports = ({isRewinding, setIsRewinding, sheetName, rotorFitShaft, rotorMatchShaft, setRotorFitShaft, setRotorMatchShaft, whoIsWinding, setWhoIsWinding, rotorNumber, setRotorNumber}) => {
  return (
    <div>
      <div className={`${sheetName}-rotor-info`}>
        <TextField InputLabelProps={{shrink: true}} defaultValue={rotorNumber || ''} variant='standard' label='ROTOR #:' sx={{width: '300px'}} onChange={(e) => setRotorNumber(e.target.value)}/>
        <div>
          <FormControl fullWidth sx={{marginTop: '3px'}}>
            <InputLabel id="rewinding/requalifying-select" sx={{transform: 'translateX(0px)', fontSize: "12px"}}>Requalify/Rewind</InputLabel>
            <Select
              labelId="rewinding/requalifying-select"
              id="xxx-----doesnt-matter"
              value={isRewinding}
              label="Age"
              onChange={(e) => setIsRewinding(e.target.value)}
              size="small"
              fullWidth
              variant="standard"
              required
            >
              <MenuItem value={'Choose One'}>Choose One</MenuItem>
              <MenuItem value={'Requalify'}>Requalify</MenuItem>
              <MenuItem value={'Rewind'}>Rewind</MenuItem>
            </Select>
          </FormControl>
        </div>
        <TextField InputLabelProps={{shrink: true}} variant='standard' label='WHO IS WINDING?:' sx={{width: '300px'}} defaultValue={whoIsWinding || ""} onChange={(e) => setWhoIsWinding(e.target.value)}/>
      </div>

      <div className={`${sheetName}-rotor-question-1 ${sheetName}-rotor-question`}>
        <div className="rotor-question">Does the rotor fit on the shaft?</div>
        <YesNoSelector value={rotorFitShaft} set={setRotorFitShaft} />
      </div>

      <div className={`${sheetName}-rotor-question-2 ${sheetName}-rotor-question`}>
        <div className="rotor-question">Does the rotor match the stator?</div>
        <YesNoSelector value={rotorMatchShaft} set={setRotorMatchShaft}/>
        <DoNotRewindText value={rotorMatchShaft}/>
      </div>
    </div>
  );
};

const DoNotRewindText = ({value}) => {
  if (value !== false) return;
  return (
    <div className='do-not-rewind-text'>
      DO NOT REWIND
    </div>
  );
};