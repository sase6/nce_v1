const React = require('react');
const bar128 = require('./bar128.js');

module.exports = ({}) => {
  return (
    <div className="p2-part-and-description">
      <div className="p2-part-and-description-info">
      
        <div className="p2-part-info">
          <div className="p2-part-order-number-header p2-header">ORDER NUMBER</div>
          <div className="p2-part-part-number-header p2-header">PART NUMBER</div>
          <div className="p2-part-revision-header p2-header">REVISION</div>
          <div className="p2-part-order-number-text">{'serialNumber'}</div>
          <div className="p2-part-part-number-text">{'partNumber'}</div>
          <div className="p2-part-revision-text">{'revision'}</div>
        </div>
     
        <div className="p2-part-description">
          <div className="p2-part-description-header p2-header">DESCRIPTION</div>
          <div className="p2-part-description-text">{'description'}</div>
        </div>
      </div>

      <div className="p2-part-and-description-barcode">
        <div className="p2-job-number-barcode bar128">{bar128('70106')}</div>
        <div className="p2-job-number-text">70106</div>
      </div>
    </div>
  );
};