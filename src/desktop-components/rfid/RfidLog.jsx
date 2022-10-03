const React = require("react");
const {useState} = require("react");
const {TextField, Button, InputLabelProps, FormControl, InputLabel, Select, MenuItem} = require("@mui/material");

const fakeData = {
  readerName: "b74398dw9",
  subzone: "Maspeth In",
  type: "Compressor",
  tagName: "53478",
  jobNumber: 423890,
  modelNumber: "06ds8246bc3200",
  voltage: "multi",
  date: (new Date).toLocaleDateString()
}

module.exports = ({page}) => {
  if (page !== "RFID Log") return;

  const [readerName, setReaderName] = useState("ALL");
  const [subzone, setSubzone] = useState("ALL");
  const [type, setType] = useState("COMPRESSORS");
  const [rfidNumber, setRfidNumber] = useState("");
  const [jobNumber, setJobNumber] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [voltage, setVoltage] = useState("");

  const setHeaderState = (event, set) => {
    set(event.target.value.toString().toLowerCase());
  };

  const queryDb = () => {
    console.log("querying db");
    console.log({readerName});
    console.log({subzone});
    console.log({jobNumber});
    console.log({modelNumber});
    console.log({type});
    console.log({rfidNumber});
    console.log({voltage});
  };

  return (
    <div className="rfid-log">
      <div className="rfid-query-container">
        <div className="rfid-query-reader-name">
          <HeaderFieldMenu state={readerName} setState={setReaderName} label="Reader Name" values={["ALL"]}/>
        </div>
        <div className="rfid-query-subzone">
          <HeaderFieldMenu state={subzone} setState={setSubzone} label="Subzone Type" values={["ALL", "IN", "OUT"]}/>
        </div>
        <div className="rfid-query-type">
          <HeaderFieldMenu state={type} setState={setType} label="Data Type" values={["ALL", "COMPRESSORS", "STATORS"]}/>
        </div>
        <div className="rfid-query-rfid-number">
          <HeaderField label="Rfid Number" onChangeCb={(e) => setHeaderState(e, setRfidNumber)}/>
        </div>
        <div className="rfid-query-job-number">
          <HeaderField label="Job Number" onChangeCb={(e) => setHeaderState(e, setJobNumber)}/>
        </div>
        <div className="rfid-query-model-number">
          <HeaderField label="Model Number" onChangeCb={(e) => setHeaderState(e, setModelNumber)}/>
        </div>
        <div className="rfid-query-voltage">
          <HeaderField label="Voltage" onChangeCb={(e) => setHeaderState(e, setVoltage)}/>
        </div>
        <div className="rfid-query-button">
          <Button variant="outlined" onClick={queryDb}>Search</Button>
        </div>
      </div>
    </div>
  );
};

const HeaderField = ({label, onChangeCb=()=>{}}) => {
  return (
    <TextField 
      InputLabelProps={{shrink: true}} 
      fullWidth 
      size="small" 
      label={label}
      variant="outlined"
      onChange={(e) => onChangeCb(e)}
    />
  );
};

const HeaderFieldMenu = ({label, state, setState, values=[]}) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`rfid-query-label-${label}`}>{label}</InputLabel>
      <Select
        labelId={`rfid-query-label-${label}`}
        value={state}
        label={state}
        onChange={(e) => setState(e.target.value.toLowerCase())}
      >
        {values.map((value, i) => {
          return (
            <MenuItem key={`menu-item-${i}`} value={value}>{value}</MenuItem>
          );
        })}
      </Select>
    </FormControl> 
  );
};
