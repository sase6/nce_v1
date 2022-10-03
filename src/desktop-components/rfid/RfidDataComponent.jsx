const React = require("react");
const {useEffect} = require("react");
const {TextField, InputLabelProps} = require("@mui/material");

module.exports = ({readerName, subzone, type, date, jobNumber, modelNumber, voltage, rfidNumber, colorId}) => {

  const inInString = (subzone) => {
    const substring = subzone.slice(subzone.length - 3).toLowerCase();
    if (substring.indexOf("in") <= -1) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="rfid-data-container" style={{background: colorId%2===0? "whitesmoke" : "white"}}>
      <div className="rfid-data-location">MASPETH</div>
      <div className="rfid-data-meta-container">
        <div className="rfid-data-subzone-type" style={{backgroundColor: inInString(subzone)? "" : "rgba(205, 92, 92, 0.45)"}}>{inInString(subzone)? "IN" : "OUT"}</div>
        <DataField label="Type" value={type.toUpperCase()}/>
        <DataField label="Date" value={date}/>
        <DataField label="Job Number" value={jobNumber}/>
        <DataField label="Model Number" value={modelNumber.toUpperCase()}/>
        <DataField label="Voltage" value={voltage.toUpperCase()}/>
      </div>
      <div className="rfid-data-rfid-number">{rfidNumber}</div>
    </div>
  );
};

const DataField = ({label, value}) => {
  return (
    <TextField 
      size="small"
      disabled
      fullWidth
      InputLabelProps={{shrink: true}}
      label={label}
      value={value}
    />
  );
};