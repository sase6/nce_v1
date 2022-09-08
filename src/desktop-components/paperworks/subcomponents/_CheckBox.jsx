const React = require('react');
const { FormGroup, FormControlLabel, Checkbox } = require('@mui/material');

module.exports = ({set, value, sheetName, label="Passed"}) => {
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
          label={label} 
        />  
      </FormGroup>
    </div> 
  );
};
