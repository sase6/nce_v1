const React = require('react');
const { FormGroup, FormControlLabel, Checkbox } = require('@mui/material');

module.exports = (props) => {
  const {ironDmgTest, setIronDmgTest, sheetName} = props;
  const {coreLossTest, setCoreLossTest} = props;
  const {hotSpotTest, setHotSpotTest} = props;
  
  return (
    <div className={`${sheetName}-pass-or-fail`}>

      <div className={`${sheetName}-pass-or-fail-text`}>
        Visual inspection for iron damage <br/>
        Check stator inside diameter
      </div>
      <div className={`${sheetName}-pass-or-fail-checkbox`}>
        <_CheckBox value={ironDmgTest} set={setIronDmgTest} sheetName={sheetName}/>
        <FailedText value={ironDmgTest}/>
      </div>
 

      <div className={`${sheetName}-pass-or-fail-text`}>
        .003 Max out of round <br/>
        Check outside diameter <br/>
        Act 39 core loss test
      </div>
      <div className={`${sheetName}-pass-or-fail-checkbox`}>
        <_CheckBox value={coreLossTest} set={setCoreLossTest} sheetName={sheetName}/>
        <FailedText value={coreLossTest}/>
      </div>

      <div className={`${sheetName}-pass-or-fail-text`}>
        Core loss for hot spot test is required before <br/>
        any repairs are initiated on the stator iron
      </div>
      <div className={`${sheetName}-pass-or-fail-checkbox`}>
        <_CheckBox value={hotSpotTest} set={setHotSpotTest} sheetName={sheetName}/>
        <FailedText value={hotSpotTest}/>
      </div>
    </div>
  );
};

const _CheckBox = ({set, value, sheetName}) => {
  return (
    <div className={`${sheetName}`}>
      <FormGroup>
        <FormControlLabel 
          control={
            <Checkbox 
              checked={value || false} 
              onChange={(e) => set(e.target.checked)}
              sx={{
                fontSize: "20px"
              }}
              size="medium"
            />
          } 
          label="Passed" 
        />  
      </FormGroup>
    </div> 
  );
};

const FailedText = ({value}) => {
  if (value) return;
  return (
    <div className="failed-text">FAILED</div>
  );
};