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

  const setScrapValue = (val) => {
    val = val.toUpperCase();
    console.log((val === 'YES' || val === 'Y'));

    setScrap((val === 'Y' || val === 'YES'));
  };

  const [modelNumber, setModelNumber] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [voltage, setVoltage] = useState('');
  const [ccHeater, setCCHeater] = useState('');
  const [unloaders, setUnloaders] = useState('');
  const [statorStatus, setStatorStatus] = useState('');
  const [incomingNumber, setIncomingNumber] = useState('');
  const [scrap, setScrap] = useState('');
  const [notes, setNotes] = useState('');

  const inputTypeMap = {
    modelNumber: {
      text: 'What is the Model Number?',
      textLabel: 'Model Number',
      setFunc: setModelNumber,
      validate: blankValidation,
      value: () => modelNumber,
      setValue: setModelNumber
    },
    serialNumber: {
      text: 'What is the Serial Number?',
      textLabel: 'Serial Number',
      setFunc: setSerialNumber,
      validate: blankValidation,
      value: () => serialNumber,
      setValue: setSerialNumber
    },
    voltage: {
      text: 'What is the Voltage of the Stator?',
      textLabel: 'Voltage',
      setFunc: setVoltage,
      validate: blankValidation,
      value: () => voltage,
      setValue: setVoltage
    },
    ccHeater: {
      text: 'Does it have any CC Heaters?',
      textLabel: 'CC Heaters',
      setFunc: setCCHeater,
      default: 'NO',
      helperText: 'Please enter "YES" or "Y" for yes',
      validate: (text) => withinValidation(text, ['YES', 'NO', 'Y', 'N']),
      value: () => ccHeater,
      setValue: setCCHeater
    },
    Unloaders: {
      text: 'How many Unloaders does it have?',
      textLabel: 'Unloaders',
      setFunc: setUnloaders,
      helperText: 'PLEASE ENTER ONLY 0, 1 OR 2',
      validate: (text) => withinValidation(text, ['0', '1', '2']),
      value: () => unloaders,
      setValue: setUnloaders
    },
    statorStatus: {
      text: 'What Condition is the Stator in?',
      textLabel: 'Stator Status',
      setFunc: setStatorStatus,
      default: 'GOOD',
      helperText: 'PLEASE ONLY ENTER "BAD" if stator is bad',
      validate: (text) => withinValidation(text, ['GOOD', 'BAD']),
      value: () => statorStatus,
      setValue: setStatorStatus
    },
    incomingNumber: {
      text: 'Is there an Incoming Number?',
      textLabel: 'Incoming Number',
      setFunc: setIncomingNumber,
      default: 'N/A',
      validate: blankValidation,
      value: () => incomingNumber,
      setValue: setIncomingNumber
    },
    scrap: {
      text: 'Is This Going to Scrap?',
      textLabel: 'Scrap?',
      setFunc: setScrapValue,
      default: 'NO',
      helperText: 'Please enter "YES" or "Y" TO MARK AS SCRAPPED',
      validate: (text) => withinValidation(text, ['YES', 'NO', 'Y', 'N']),
      value: () => scrap,
      setValue: setScrapValue
    },
    notes: {
      text: 'Include Any Additional Information Here',
      textLabel: 'Notes',
      setFunc: setNotes,
      validate: () => true,
      value: () => notes,
      setValue: setNotes
    },
  };

  const listOfEntries = Object.keys(inputTypeMap);
  const [curIndex, setCurIndex] = useState(0);
  const [curInput, setCurInput] = useState(inputTypeMap[listOfEntries[curIndex]]);
  const [reviewingJob, setReviewingJob] = useState(false);
  const toggleReviewingJob = () => setReviewingJob(!reviewingJob);


  const incrementIndex = () => {
    let nextController = inputTypeMap[listOfEntries[curIndex + 1]];
    let element = document.querySelector('#add-job-input-field');

    if (!curInput.validate(element.value)) return; //Validation Err

    curInput.setValue(element.value);
    if (curIndex < 8) {
      element.value = nextController.value() || nextController.default || '';
      setCurIndex(curIndex + 1);
    }
  
    element.focus();
    element.select();

    if (curIndex === 8) {
      toggleReviewingJob();
    } 
  };
  const incrementByEnter = (e) => {
    if (e.key === 'Enter') incrementIndex();
  };

  const decrementIndex = () => {
    let element = document.querySelector('#add-job-input-field');
    let priorController = inputTypeMap[listOfEntries[curIndex - 1]];
    curInput.setValue(element.value);

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