const React = require('react');

module.exports = ({sheet}) => {
  if (sheet!== 'barcode' && sheet !== 'both') return;
  
  return (
    <div className='bartender-barcode-display'>
      Barcode
    </div>
  );
};