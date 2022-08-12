const React = require('react');
const { TextField, Button } = require('@mui/material');
const { useState, useEffect } = require('react');
const ReviewJob = require('./reviewJob.jsx');

const AppendJobModal = (props) => {
  const { addJobModal, setAddJobModal, user, fetchAndSetJobRange } = props;
  if (!addJobModal) return;

  const blankValidation = (text) => {
    text = text.toUpperCase();
    if (text.length <= 0) return false;
    return true;
  };

  const withinValidation = (text, range=[]) => {
    text = text.toUpperCase();
    if (range.indexOf(text) !== -1) return true;
    return false;
  };

  const [modelNumber, setModelNumber] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [voltage, setVoltage] = useState('');
  const [ccHeater, setCCHeater] = useState('');
  const [unloaders, setUnloaders] = useState('');
  const [statorStatus, setStatorStatus] = useState('');
  const [incomingNumber, setIncomingNumber] = useState('');
  const [scrap, setScrap] = useState('');
  const [warranty, setWarranty] = useState('');
  const [notes, setNotes] = useState('');

  const inputTypeMap = {
    modelNumber: {
      text: 'What is the Model Number?',
      textLabel: 'Model Number',
      validate: blankValidation,
      value: () => modelNumber,
      setValue: setModelNumber
    },
    serialNumber: {
      text: 'What is the Serial Number?',
      textLabel: 'Serial Number',
      validate: blankValidation,
      value: () => serialNumber,
      setValue: setSerialNumber
    },
    voltage: {
      text: 'What is the Voltage of the Stator?',
      textLabel: 'Voltage',
      validate: blankValidation,
      value: () => voltage,
      setValue: setVoltage
    },
    Unloaders: {
      text: 'How many Unloaders does it have?',
      textLabel: 'Unloaders',
      default: '?',
      helperText: 'PLEASE ENTER ONLY 0, 1 OR 2, OR "?" IF YOU DON\'T KNOW"',
      validate: (text) => withinValidation(text, ['0', '1', '2', '?']),
      value: () => unloaders,
      setValue: setUnloaders
    },
    statorStatus: {
      text: 'What Condition is the Stator in?',
      textLabel: 'Stator Status',
      default: 'GOOD',
      helperText: 'PLEASE ONLY ENTER "BAD" IF STATOR IS BAD, CAN ALSO TYPE "?"',
      validate: (text) => withinValidation(text, ['GOOD', 'BAD', '?']),
      value: () => statorStatus,
      setValue: setStatorStatus
    },
    incomingNumber: {
      text: 'Is there an Incoming Number?',
      textLabel: 'Incoming Number',
      default: 'N/A',
      validate: blankValidation,
      value: () => incomingNumber,
      setValue: setIncomingNumber
    },
    warranty: {
      text: 'Is This A Warrany Return?',
      textLabel: 'Warranty Return?',
      helperText: 'PLEASE ENTER "YES" OR "Y" FOR YES, OR "NO" OR "N" FOR NO',
      default: '?',
      validate: (text) => withinValidation(text, ['YES', 'NO', 'Y', 'N', '?']),
      value: () => warranty,
      setValue: setWarranty
    }
  };

  const listOfEntries = Object.keys(inputTypeMap);
  const [curIndex, setCurIndex] = useState(0);
  const [curInput, setCurInput] = useState(inputTypeMap[listOfEntries[curIndex]]);
  const [reviewingJob, setReviewingJob] = useState(false);
  const toggleReviewingJob = () => setReviewingJob(!reviewingJob);
  const inputTypeMapSize = Object.keys(inputTypeMap).length -1;


  const incrementIndex = () => {
    let nextController = inputTypeMap[listOfEntries[curIndex + 1]];
    let element = document.querySelector('#add-job-input-field');

    if (!curInput.validate(element.value.toUpperCase())) return; //Validation Err

    curInput.setValue(element.value.toUpperCase());
    if (curIndex < inputTypeMapSize) {
      element.value = nextController.value() || nextController.default || '';
      setCurIndex(curIndex + 1);
    }
  
    element.focus();
    element.select();

    if (curIndex === inputTypeMapSize) {
      toggleReviewingJob();
    } 
  };
  const incrementByEnter = (e) => {
    if (e.key === 'Enter') incrementIndex();
  };

  const decrementIndex = () => {
    let element = document.querySelector('#add-job-input-field');
    let priorController = inputTypeMap[listOfEntries[curIndex - 1]];
    curInput.setValue(element.value.toUpperCase());

    if (curIndex !== 0) {
      element.value = priorController.value() || priorController.default || '';
      setCurIndex(curIndex - 1);
    }

    document.querySelector('#add-job-input-field').focus();
    document.querySelector('#add-job-input-field').select();
  };

  useEffect(() => {
    setCurInput(inputTypeMap[listOfEntries[curIndex]]);
  }, [curIndex]);

  if (reviewingJob) {
    return (
      <div className='job-book-add-job-screen-overlay'>
        <ReviewJob 
          modelNumber={modelNumber}
          serialNumber={serialNumber}
          voltage={voltage}
          ccHeater={ccHeater}
          unloaders={unloaders}
          statorStatus={statorStatus}
          incomingNumber={incomingNumber}
          scrap={scrap}
          notes={notes}
          toggleReviewingJob={toggleReviewingJob}
          cancelHandler={() => setAddJobModal(false)}
          user={user}
          warranty={warranty}
          fetchAndSetJobRange={fetchAndSetJobRange}
        />
      </div>
    );
  }

  return (
    <div className='job-book-add-job-screen-overlay'>
      <div className="job-book-add-new-job-container">
        <div className="job-book-add-new-job-text">
          {curInput.text}
        </div>
        <TextField helperText={curInput.helperText || ''} defaultValue={curInput.default} label={curInput.textLabel} className="add-job-input-field" id={'add-job-input-field'} fullWidth sx={{width: 'calc(100% - 20px)'}} autoFocus onKeyUp={incrementByEnter}/>
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