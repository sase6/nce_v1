const React = require('react');
const { useState, useEffect } = require('react');
const { TextField, Button, FormControl, InputLabel, Select, MenuItem } = require('@mui/material'); 
const Toolbar = require('./Toolbar.jsx');
const ProcedureToQualifyingStatorIronsForRewinding = require('./ProcedureToQualifyingStatorIronsForRewinding.jsx');

interface Props {
  user: string;
  page: string;
  query: string;
};

const Paperworks = (props:Props) => {
  if (props.page !== 'Paperworks') return;

  const [paperworkName, setPaperworkName] = useState('p1');
  const [currentJobNumber, setCurrentJobNumber] = useState(70100);

  return (
    <div className="paperworks">
      <Toolbar 
        query={props.query} 
        paperworkName={paperworkName}
        setPaperworkName={setPaperworkName}
        currentJobNumber={currentJobNumber}
        setCurrentJobNumber={setCurrentJobNumber}
      />
      <ProcedureToQualifyingStatorIronsForRewinding />
    </div>
  );
};

module.exports = Paperworks;