const React = require('react');
const {FormGroup, FormControlLabel, Checkbox, TextField, InputLabelProps} = require('@mui/material');
const P2Meta = require('./P2Meta.jsx');

module.exports = ({sheet, modelNumber, serialNumber, voltage, partNumber, revision, description, stock, oil, customerName, discus, delta, resistorKit}) => {
    if (sheet!== 'paperwork' && sheet !== 'both') return;
    
    return (
    <div className='shop-floor-process-sheet'>
      <div className="shop-floor-process-sheet-upper">
        <div className="shop-floor-process-sheet-title">SHOP FLOOR PROCESS SHEET</div>

        <P2Meta />

        <div className="p2-customer-info-container">
          <div className="p2-customer-info-boxes">
            <div className="stock-checkbox">
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked disableRipple sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}/>} label="Stock" />
              </FormGroup>
            </div>

            <div className="p2-oil-boxes">
            <div className="oil-checkbox">
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked disableRipple sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}/>} label="Oil" />
              </FormGroup>
            </div>
            <div className="no-oil-checkbox">
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked disableRipple sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}/>} label="No-Oil" />
              </FormGroup>
            </div>
            </div>

          </div>

          
          <div className="p2-customer-name-container">
            <div className="customer-name-input">
              <TextField InputLabelProps={{shrink: true}} variant='standard' fullWidth size='small' sx={{height: 50}} label="Customer Name"/>
            </div>
          </div>
        </div>

        {/* <div className="p2-copeland-info-box">
          <div className="copeland-text">COPELAND: </div>
          <div className="discus-checkbox">[] Discus</div>
          <div className="delta-checkbox">[] Delta</div>
          <div className="delta-post-text">IF DELTA, MAKE SURE AN "A" IS ADDED TO MODEL# (4DK3A)</div>
        </div>

        <div className="p2-dxs-checkbox">
          <div className="p2-dsx-text">DXS YORK SCREWS - IS RESISTOR KIT NEEDED: </div>
          <div className="yes-checkbox">[] YES</div>
          <div className="no-checkbox">[] NO</div>
        </div> */}
      </div>

      <div className="shop-floor-process-sheet-lower">
        
        <div className="p2-meta-info-container">
          <div className="p2-meta-model-num">{modelNumber}</div>
          <div className="p2-meta-other-vals">{`S#${serialNumber} ${voltage}V`}</div>
        </div>
      
      </div>
    </div>
  );
};