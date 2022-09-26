const React = require('react');
const {useState, useEffect} = require('react');
const Toolbar = require('./Toolbar.jsx');
const BarcodeDisplay = require('./BarcodeDisplay.jsx');
const ShopFloorProcessSheet = require('./ShopFloorProcessSheet.jsx');

const Bartender = ({page}) => {
  if (page !== 'Bartender') return;
  const [sheet, setSheet] = useState('paperwork');
  const [serialNumber, setSerialNumber] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [voltage, setVoltage] = useState("");

  return (
    <div className="bartender">
      <Toolbar 
        sheet={sheet}
        setSheet={setSheet}
        setSerialNumber={setSerialNumber}
        setModelNumber={setModelNumber}
        setVoltage={setVoltage}
      />

      <BarcodeDisplay 
        sheet={sheet}
        serialNumber={serialNumber}
        modelNumber={modelNumber}
        voltage={voltage}
      />

      <ShopFloorProcessSheet 
        sheet={sheet}
        serialNumber={serialNumber}
        modelNumber={modelNumber}
        voltage={voltage}
      />
    </div>
  );
};

module.exports = Bartender;