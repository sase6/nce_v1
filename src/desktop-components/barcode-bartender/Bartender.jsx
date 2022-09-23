const React = require('react');
const {useState, useEffect} = require('react');
const Toolbar = require('./Toolbar.jsx');
const BarcodeDisplay = require('./BarcodeDisplay.jsx');
const ShopFloorProcessSheet = require('./ShopFloorProcessSheet.jsx');

const Bartender = ({page}) => {
  if (page !== 'Bartender') return;
  const [showP2, setShowP2] = useState(false);
  const [serialNumber, setSerialNumber] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [voltage, setVoltage] = useState("");

  return (
    <div className="bartender">
      <Toolbar 
        setShowP2={setShowP2}
        setSerialNumber={setSerialNumber}
        setModelNumber={setModelNumber}
        setVoltage={setVoltage}
      />

      <BarcodeDisplay 
        serialNumber={serialNumber}
        modelNumber={modelNumber}
        voltage={voltage}
      />

      <ShopFloorProcessSheet 
        render={showP2}
        serialNumber={serialNumber}
        modelNumber={modelNumber}
        voltage={voltage}
      />
    </div>
  );
};

module.exports = Bartender;