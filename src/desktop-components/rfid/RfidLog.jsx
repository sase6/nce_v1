const React = require("react");
const {useState, useEffect} = require("react");
const {TextField, Button, InputLabelProps, FormControl, InputLabel, Select, MenuItem} = require("@mui/material");
const RfidDataComponent = require("./RfidDataComponent.jsx");
const axios = require('axios');

module.exports = ({page}) => {
  if (page !== "RFID Log") return;
  const [readerName, setReaderName] = useState("ALL");
  const [subzone, setSubzone] = useState("ALL");
  const [type, setType] = useState("COMPRESSOR");
  const [rfidNumber, setRfidNumber] = useState("");
  const [jobNumber, setJobNumber] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [voltage, setVoltage] = useState("");
  const [maxPageIndex, setMaxPageIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [queriedData, setQueriedData] = useState([]);

  const getDatabaseData = () => {
    axios({
      method: "post",
      url: "/rfrain/database/data",
      data: {
        tagName: rfidNumber, 
        readerName, 
        jobNumber, 
        modelNumber, 
        voltage,
        type,
        subzone,
        page: pageIndex
      }
    })
    .then(({data}) => {
      console.log("returned: ", data.amount);
      setMaxPageIndex(Math.floor(data.amount/ 100));
      setQueriedData(data.results);
      const result = [];

      data.results.forEach(dataObj => {
        if (type !== "ALL" && dataObj.type.indexOf(type) === -1) return;
      });
    })
    .catch((err) => {
      console.log("Error Fetching Rfrain Database: ", err);
    });
  };

  const setHeaderState = (event, set) => {
    set(event.target.value.toString().toLowerCase());
  };

  useEffect(() => {
    getDatabaseData();
  }, []);

  const changePageIndexNumber = (val) => {
    if (val === -1 && pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    } else if (pageIndex < maxPageIndex) {
      setPageIndex(pageIndex + 1);
    }

    getDatabaseData();
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
          <HeaderFieldMenu state={type} setState={setType} label="Data Type" values={["ALL", "COMPRESSOR", "STATOR"]}/>
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
          <Button variant="outlined" onClick={() => {getDatabaseData(); setPageIndex(0)}}>Search</Button>
          <div className="rfid-query-page-container">
            <div className="rfid-query-left-button" onClick={() => changePageIndexNumber(-1)}> {`<`} </div>
            <div className="rfid-query-page-number">{`${pageIndex}/${maxPageIndex}`}</div>
            <div className="rfid-query-right-button" onClick={changePageIndexNumber}> {`>`} </div>
          </div>
        </div>
      </div>

      <RfidTagsContainer queriedData={queriedData}/>
    </div>
  );
};

const RfidTagsContainer = ({queriedData}) => {
  return (
    <div className="rfid-tags-container">
      {queriedData.map((dataObj, i) => {
        return (
          <RfidDataComponent 
            key={`rfid-data-component-${i}`}
            readerName={dataObj.readerName}
            subzone={dataObj.subzone}
            type={dataObj.type}
            date={dataObj.date}
            jobNumber={dataObj.jobNumber}
            modelNumber={dataObj.modelNumber}
            voltage={dataObj.voltage}
            rfidNumber={dataObj.tagName}
            colorId={i}
          />
        );
      })}
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
        value={state.toUpperCase()}
        label={label}
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