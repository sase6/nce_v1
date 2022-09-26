const React = require('react');
const {FormGroup, FormControlLabel, Checkbox, TextField, InputLabelProps} = require('@mui/material');
const P2Meta = require('./P2Meta.jsx');

module.exports = ({sheet, modelNumber, serialNumber, voltage, partNumber, revision, description, stock, oil, customerName, discus, delta, dxs, setSerialNumber, setPartNumber, setRevision, setDescription, setStock, setOil, setCustomerName, setDiscus, setDelta, setDxs}) => {
    if (sheet!== 'paperwork' && sheet !== 'both') return;
    
    return (
    <div className='shop-floor-process-sheet'>
      <div className="shop-floor-process-sheet-upper">
        <div className="shop-floor-process-sheet-title">SHOP FLOOR PROCESS SHEET</div>

        <P2Meta
          serialNumber={serialNumber}
          partNumber={partNumber}
          revision={revision}
          description={description}
          setSerialNumber={setSerialNumber}
          setPartNumber={setPartNumber}
          setRevision={setRevision}
          setDescription={setDescription}
        />

        <div className="p2-customer-info-container">
          <div className="p2-customer-info-boxes">
            <div className="stock-checkbox">
              <FormGroup>
                <FormControlLabel sx={{color: 'black'}} control={<Checkbox defaultChecked={stock} onChange={(e) => setStock(e.target.checked)} disableRipple sx={{ '& .MuiSvgIcon-root': { fontSize: 30, color: 'black' } }}/>} label="Stock" />
              </FormGroup>
            </div>

            <div className="p2-oil-boxes">
            <div className="oil-checkbox">
              <FormGroup>
                <FormControlLabel sx={{color: 'black'}} control={<Checkbox defaultChecked={oil} onChange={(e) => setOil(e.target.checked)} disableRipple sx={{ '& .MuiSvgIcon-root': { fontSize: 30, color: 'black' } }}/>} label="Oil" />
              </FormGroup>
            </div>
            <div className="no-oil-checkbox">
              <FormGroup>
                <FormControlLabel sx={{color: 'black'}} control={<Checkbox defaultChecked={!oil} onChange={(e) => setOil(!e.target.checked)}  disableRipple sx={{ '& .MuiSvgIcon-root': { fontSize: 30, color: 'black' } }}/>} label="No-Oil" />
              </FormGroup>
            </div>
            </div>

          </div>


          <div className="p2-customer-name-container">
            <div className="customer-name-input">
              <TextField InputLabelProps={{shrink: true}} defaultValue={customerName} onChange={(e) => setCustomerName(e.target.value)} variant='standard' fullWidth size='small' sx={{height: 50, color: 'black'}} label="Customer Name"/>
            </div>
          </div>
        </div>

        <div className="p2-copeland-info-box">
          <div className="copeland-text">COPELAND: </div>
          <div className="discus-checkbox">
            <div className="discus-checkbox">
              <FormGroup>
                <FormControlLabel control={<Checkbox disableRipple defaultChecked={discus} onChange={(e) => setDiscus(e.target.checked)} sx={{ '& .MuiSvgIcon-root': { fontSize: 30, color: 'black' } }}/>} label="Discus" />
              </FormGroup>
            </div>
          </div>
          <div className="delta-checkbox">
            <div className="delta-checkbox">
              <FormGroup>
                <FormControlLabel control={<Checkbox disableRipple defaultChecked={delta} onChange={(e) => setDelta(e.target.checked)} sx={{ '& .MuiSvgIcon-root': { fontSize: 30, color: 'black' } }}/>} label="Delta" />
              </FormGroup>
            </div>
          </div>
          <div className="delta-post-text">If Delta, make sure an "A" is added to the model # (Ex: 4DK3A)</div>
        </div>

        <div className="p2-dxs-checkbox">
          <div className="p2-dsx-text">DXS YORK SCREWS - IS RESISTOR KIT NEEDED: </div>
          <div className="yes-checkbox">
            <div className="yes-checkbox">
              <FormGroup>
                <FormControlLabel control={<Checkbox disableRipple defaultChecked={dxs} onChange={(e) => setDxs(e.target.checked)} sx={{ '& .MuiSvgIcon-root': { fontSize: 30, color: 'black' } }}/>} label="Yes" />
              </FormGroup>
            </div>
          </div>
          <div className="no-checkbox">
            <div className="no-checkbox">
              <FormGroup>
                <FormControlLabel control={<Checkbox disableRipple defaultChecked={!dxs} onChange={(e) => setDxs(!e.target.checked)} sx={{ '& .MuiSvgIcon-root': { fontSize: 30, color: 'black' } }}/>} label="No" />
              </FormGroup>
            </div>
          </div>
        </div>
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