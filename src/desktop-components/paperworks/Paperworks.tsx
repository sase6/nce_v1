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
  const [document, setDocument] = useState({});
  const timeBeforeSearch = 500;

  const fetchDocument = () => {
    axios({
      method: 'get',
      url: `/${paperworkName}/${currentJobNumber}`
    })
    .then((res) => {
      setDocument(res.data || {});
    })
    .catch(err => console.log({err}));
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
      />
      <ProcedureToQualifyingStatorIronsForRewinding preset={document}/>
    </div>
  );
};

module.exports = Paperworks;