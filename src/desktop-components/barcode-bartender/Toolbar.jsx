const React = require('react');
const {useEffect} = require('react');
const { TextField, InputLabelProps, Button, FormGroup, FormControlLabel, Checkbox, FormControl, InputLabel, MenuItem, Select } = require('@mui/material');
const { fontSize } = require('@mui/system');

module.exports = ({sheet, setSheet, setSerialNumber, setModelNumber, setVoltage}) => {
    useEffect(() => {
    window.addEventListener('beforeprint', () => {
      document.querySelector('.desktop-nav').style.display = "none";
      document.querySelector('.bartender-toolbar').style.display = "none";
      document.querySelector('.bartender-barcode-display-container').style.transform = "scale(1)";
    });

    window.addEventListener("afterprint", () => {
      document.querySelector('.desktop-nav').style.display = "grid";
      document.querySelector('.bartender-toolbar').style.display = "grid";
      document.querySelector('.bartender-barcode-display-container').style.transform = "scale(3)";

    });
  }, []);

  return (
    <div className='bartender-toolbar'>
      <div className="bartender-toolbar-model-number-container">
        <TextField 
          label="Model Number"
          variant="outlined"
          size="small"
          InputLabelProps={{shrink: true}}
          onChange={(e) => setModelNumber(e.target.value.toUpperCase())}
          fullWidth
        />
      </div>

      <div className="bartender-toolbar-serial-number-container">
        <TextField 
          label="Serial Number"
          variant="outlined"
          size="small"
          InputLabelProps={{shrink: true}}
          onChange={(e) => setSerialNumber(e.target.value.toUpperCase())}
          fullWidth
        />
      </div>
      
      <div className="bartender-toolbar-voltage-container">
        <TextField 
          label="Voltage"
          variant="outlined"
          size="small"
          InputLabelProps={{shrink: true}}
          onChange={(e) => setVoltage(e.target.value.toUpperCase())}
          fullWidth
        />
      </div>
      
      <div className="bartender-toolbar-toggle-p2-container">
        <FormControl fullWidth size='small'>
        <InputLabel id="select-bartender-sheet">Sheet</InputLabel>
        <Select
            labelId="select-bartender-sheet"
            id="select-bartender-sheet"
            value={sheet}
            label="Sheet"
            sx={{minHeight: 40, height: 40}}
            onChange={(e) => setSheet(e.target.value)}
        >
            <MenuItem value={'barcode'}>Barcode Only</MenuItem>
            <MenuItem value={'paperwork'}>Shop Floor Process Sheet</MenuItem>
            <MenuItem value={'both'}>Both</MenuItem>
        </Select>
        </FormControl>
      </div>

      <div className="bartender-print-button">
        <Button
          variant="outlined"
          sx={{width: 100}}
          onClick={() => window.print()}
        >
          Print
        </Button>
      </div>
    </div>
  );
};