const React = require('react');
const { TextField, Button } = require('@mui/material');
const { useState, useEffect } = require('react');
const ReviewJob = require('./reviewJob.jsx');

const AppendJobModal = (props) => {

  const { addJobModal, setAddJobModal } = props;
  if (!addJobModal) return;

  const inputTypeMap = {
    modelNumber: {
      text: 'What is the Model Number?',
      textLabel: 'Model Number',
      setFunc: setModelNumber
    },
    serialNumber: {
      text: 'What is the Serial Number?',
      textLabel: 'Serial Number',
      setFunc: setSerialNumber
    },
    voltage: {
      text: 'What is the Voltage of the Stator?',
      textLabel: 'Voltage',
      setFunc: setVoltage
    },
    ccHeaters: {
      text: 'Does it have any CC Heaters?',
      textLabel: 'CC Heaters',
      setFunc: setCCHeaters
    },
    Unloaders: {
      text: 'How many Unloaders does it have?',
      textLabel: 'Unloaders',
      setFunc: setUnloaders
    },
    statorStatus: {
      text: 'What Condition is the Stator in?',
      textLabel: 'Stator Status',
      setFunc: setStatorStatus
    },
    incomingNumber: {
      text: 'Is there an Incoming Number?',
      textLabel: 'Incoming Number',
      setFunc: setIncomingNumber
    },
    scrap: {
      text: 'Is This Going to Scrap?',
      textLabel: 'Scrap?',
      setFunc: setScrap
    },
    notes: {
      text: 'Include Any Additional Information Here',
      textLabel: 'Notes',
      setFunc: setNotes
    },
  };

  const [modelNumber, setModelNumber] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [voltage, setVoltage] = useState('');
  const [ccHeaters, setCCHeaters] = useState('');
  const [unloaders, setUnloaders] = useState('');
  const [statorStatus, setStatorStatus] = useState('');
  const [incomingNumber, setIncomingNumber] = useState('');
  const [scrap, setScrap] = useState('');
  const [notes, setNotes] = useState('');
  const listOfEntries = Object.keys(inputTypeMap);
  const [curIndex, setCurIndex] = useState(0);
  const [curInput, setCurInput] = useState(inputTypeMap[listOfEntries[curIndex]]);

  const [reviewingJob, setReviewingJob] = useState(true);

  const incrementIndex = () => {
    // validate info
    if (curIndex !== 8) setCurIndex(curIndex + 1);
    document.querySelector('#add-job-input-field').focus();
  };

  const incrementByEnter = (e) => {
    if (e.key === 'Enter') incrementIndex();
  };

  const decrementIndex = () => {
    // validate info
    if (curIndex !== 0) setCurIndex(curIndex - 1);
    document.querySelector('#add-job-input-field').focus();
  };

  useEffect(() => {
    setCurInput(inputTypeMap[listOfEntries[curIndex]]);
  }, [curIndex]);

  if (reviewingJob) {
    return (
      <div className='job-book-add-job-screen-overlay'>
        <ReviewJob />
      </div>
    );
  }
  
  return (
    <div className='job-book-add-job-screen-overlay'>
      <div className="job-book-add-new-job-container">
        <div className="job-book-add-new-job-text">
          {curInput.text}
        </div>
        <TextField label={curInput.textLabel} className="add-job-input-field" id={'add-job-input-field'} fullWidth sx={{width: 'calc(100% - 20px)'}} autoFocus onKeyUp={incrementByEnter}/>
        <div className="job-book-append-job-interactions-container">
          <div className="inner-job-book-interactions-container">
            <Button className="job-book-add-go-back" onClick={decrementIndex}>Go Back</Button>
            <Button className="job-book-add-import">Import</Button>
            <Button className="job-book-add-cancel" sx={{background: 'indianred', color: 'white'}} onClick={() => setAddJobModal(false)} >Cancel</Button>
          </div>
          <Button variant="contained" className="job-book-add-go-forward" onClick={incrementIndex}>Next</Button>
        </div>
      </div>
    </div>
  );
};

module.exports = AppendJobModal;