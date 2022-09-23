const React = require('react');

module.exports = ({sheet}) => {
    if (sheet!== 'paperwork' && sheet !== 'both') return;
    
    return (
    <div className='shop-floor-process-sheet'>
      SHOP FLOOR PROCESS SHEET
    </div>
  );
};