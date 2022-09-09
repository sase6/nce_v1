const React = require('react');
const { useState, useEffect } = require('react');
const { TextField, Button, FormControl, InputLabel, Select, MenuItem } = require('@mui/material'); 
const Toolbar = require('./Toolbar.jsx');
const ProcedureToQualifyingStatorIronsForRewinding = require('./ProcedureToQualifyingStatorIronsForRewinding.jsx');
const axios = require('axios');
var timerForDocumentLoad:any = null;

interface Props {
  user: string;
  page: string;
  query: string;
};

const Paperworks = (props:Props) => {
  if (props.page !== 'Paperworks') return;

  const [paperworkName, setPaperworkName] = useState('p1');
  const [currentJobNumber, setCurrentJobNumber] = useState(0);
  const [preset, setPreset] = useState({});
  const [documentStatus, setDocumentStatus] = useState(null);
  const timeBeforeSearch = 200;

  const fetchDocument = () => {
    axios({
      method: 'get',
      url: `/${paperworkName}/${currentJobNumber}`
    })
    .then((res) => {
      setPreset(res.data || {});
    })
    .catch(err => console.log({err}));
  };

  const saveDocument = (data:any, isNew:boolean=false, cb:any=null) => {
    const sending = isNew? {data: {jobNumber: currentJobNumber}} : data
    axios({
      method: 'post',
      url: `/${paperworkName}`,
      data: sending,
    })
    .then(() => {
      setPreset(sending.data);
      if (cb) cb();
    })
    .catch((err:any) => console.log({err}));
  };

  // Search for document on query change
  useEffect(() => {
    if (timerForDocumentLoad) {
      clearTimeout(timerForDocumentLoad);
    }

    timerForDocumentLoad = setTimeout(() => {
      fetchDocument();
      timerForDocumentLoad = null;
    }, timeBeforeSearch);
  }, [currentJobNumber]);

  return (
    <div className="paperworks">
      <Toolbar 
        query={props.query} 
        paperworkName={paperworkName}
        setPaperworkName={setPaperworkName}
        currentJobNumber={currentJobNumber}
        setCurrentJobNumber={setCurrentJobNumber}
        documentStatus={documentStatus}
        setDocumentStatus={setDocumentStatus}
      />

      <ProcedureToQualifyingStatorIronsForRewinding 
        preset={preset} 
        saveDocument={saveDocument}
        documentStatus={documentStatus}
        setDocumentStatus={setDocumentStatus}
      />
    </div>
  );
};

module.exports = Paperworks;