const React = require('react');
const bar128 = require('./bar128.js');
const useEffect = require('react');

module.exports = ({sheet, modelNumber, serialNumber, voltage}) => {
  if (sheet!== 'barcode' && sheet !== 'both') return;
  
  return (
    <div className='bartender-barcode-display'>
      <div className="bartender-barcode-display-container">
        <div className="barcode-display-model-number">{`M# ${modelNumber}`}</div>
        <div className="barcode-display-serial-number">{`S/N ${serialNumber}`}</div>
        <div className="barcode-display">
          <div className="barcode-display-barcode bar128">{bar128(`M# ${modelNumber} S/N ${serialNumber} ${voltage}V`)}</div>
          <div className="barcode-display-barcode-text">{`M# ${modelNumber} S/N ${serialNumber} ${voltage}V`}</div>
        </div>
        <div className="barcode-display-company">NATIONAL COMPRESSOR EXCHANGE INC.</div>
      </div>
    </div>
  );    
};