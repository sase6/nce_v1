const React = require('react');
const {useState, useEffect} = require('react');
const Toolbar = require('./Toolbar.jsx');
const BarcodeDisplay = require('./BarcodeDisplay.jsx');
const ShopFloorProcessSheet = require('./ShopFloorProcessSheet.jsx');

const Bartender = ({page}) => {
  if (page !== 'Bartender') return;
  const [sheet, setSheet] = useState('both');
  const [serialNumber, setSerialNumber] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [voltage, setVoltage] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [revision, setRevision] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(null);
  const [oil, setOil] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [discus, setDiscus] = useState(false);
  const [delta, setDelta] = useState(false);
  const [dxs, setDxs] = useState(false);

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
        partNumber={partNumber}
        revision={revision}
        description={description}
        stock={stock}
        oil={oil}
        customerName={customerName}
        discus={discus}
        delta={delta}
        dxs={dxs}

        setSerialNumber={setSerialNumber}
        setPartNumber={setPartNumber}
        setRevision={setRevision}
        setDescription={setDescription}
        setStock={setStock}
        setOil={setOil}
        setCustomerName={setCustomerName}
        setDiscus={setDiscus}
        setDelta={setDelta}
        setDxs={setDxs}
      />
    </div>
  );
};

module.exports = Bartender;