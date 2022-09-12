const React = require('react');
const { TextField, Button } = require('@mui/material');
const { useState, useEffect } = require('react');
const ReviewJob = require('./reviewJob.jsx');
const axios = require('axios');

const AppendJobModal = (props) => {
  const { addJobModal, setAddJobModal, user, fetchAndSetJobRange, setAppStatus } = props;
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

  const importSpreadsheet = (e) => {
    const file = e.target.files[0];

    var reader = new FileReader();
  	reader.onload = function(e) {
      // Binary
      axios({
        method: 'post',
        url: '/jobs/many',
        data: {binary: e.target.result}
      })
      .then(() => {
        // Successfully Imported
        setAddJobModal(false);
        setAppStatus({type: 'success', msg: 'Added Jobs!'});
        fetchAndSetJobRange();
      })
      .catch((err) => {
        setAppStatus({type: 'error', msg: 'Failed to Add Jobs!'});
      });
  	};
	  reader.onerror = function(e) {
	  	console.log('Error : ' + e.type);
	  };
	  
    reader.readAsBinaryString(file);
  };

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
      textLabel: 'Warranty',
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

  getInputValByIndex = (i) => {
    switch (i) {
      case 0:
        return modelNumber;
      case 1:
        return serialNumber;        
      case 2:
        return voltage;
      case 3:
        return modelNumber;
      case 4:
        return modelNumber;
      case 5:
        return modelNumber;
    }
  };

  const incrementIndex = () => {
    let nextController = inputTypeMap[listOfEntries[curIndex + 1]];
    let element = document.querySelector('#add-job-input-field');

    if (!curInput.validate(element.value.toUpperCase())) return; //Validation Err

    curInput.setValue(element.value.toUpperCase());
    if (curIndex < inputTypeMapSize) {
      let nextVal = nextController.value();
      element.value = nextVal || nextController.default || '';
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
      let priorVal = priorController.value();
      element.value = priorVal || priorController.default || '';
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
          setAppStatus={setAppStatus}
        />
      </div>
    );
  }

  return (
    <div className='job-book-add-job-screen-overlay'>
      <div className="job-book-add-new-job-container">
        <input type="file" id="job-book-file-selector" onChange={importSpreadsheet}/>
        <div className="job-book-add-new-job-text">
          {curInput.text}
        </div>
        {/* <TextField helperText={curInput.helperText || ''} defaultValue={curInput.default} label={curInput.textLabel} className="add-job-input-field" id={'add-job-input-field'} fullWidth sx={{width: 'calc(100% - 20px)'}} autoFocus onKeyUp={incrementByEnter}/> */}
        <ENTRY 
          curInput={curInput} 
          incrementByEnter={incrementByEnter} 
          incrementIndex={incrementIndex} 
          modelNumber={modelNumber}
          serialNumber={serialNumber}
          voltage={voltage}
          ccHeater={ccHeater}
          unloaders={unloaders}
          statorStatus={statorStatus}
          incomingNumber={incomingNumber}
          warranty={warranty}
        />
        <div className="job-book-append-job-interactions-container">
          <div className="inner-job-book-interactions-container">
            <Button className="job-book-add-go-back" onClick={decrementIndex}>Go Back</Button>
            <Button className="job-book-add-import" onClick={() => document.querySelector('#job-book-file-selector').click()}>Import</Button>
            <Button className="job-book-add-cancel" sx={{background: 'indianred', color: 'white'}} onClick={() => setAddJobModal(false)} >Cancel</Button>
          </div>
          <Button variant="contained" className="job-book-add-go-forward" onClick={incrementIndex}>Next</Button>
        </div>
      </div>
    </div>
  );
};

const ENTRY = (props) => {
  const {
    curInput, 
    incrementByEnter, 
    incrementIndex,
    modelNumber,
    serialNumber,
    voltage,
    ccHeater,
    unloaders,
    statorStatus,
    incomingNumber,
    warranty
  } = props;

  if (curInput.textLabel === 'Voltage') {
    return <VoltageEntry voltage={voltage} curInput={curInput} incrementByEnter={incrementByEnter} incrementIndex={incrementIndex}/>
  } else if (curInput.textLabel === 'Unloaders') {
    return <UnloadersEntry unloaders={unloaders} curInput={curInput} incrementIndex={incrementIndex}/>
  } else if (curInput.textLabel === 'Stator Status') {
    return <StatorStatusEntry statorStatus={statorStatus} curInput={curInput} incrementIndex={incrementIndex}/>
  } else if (curInput.textLabel === 'Warranty') {
    return <WarrantyEntry warranty={warranty} curInput={curInput} incrementIndex={incrementIndex}/>
  } else if (curInput.textLabel === 'Model Number') {
    return (
      <TextField helperText={curInput.helperText || ''} defaultValue={modelNumber || curInput.default} label={curInput.textLabel} className="add-job-input-field" id={'add-job-input-field'} fullWidth sx={{width: 'calc(100% - 20px)'}} autoFocus onKeyUp={incrementByEnter}/>
    );
  } else if (curInput.textLabel === 'Serial Number') {
    return (
      <TextField helperText={curInput.helperText || ''} defaultValue={serialNumber || curInput.default} label={curInput.textLabel} className="add-job-input-field" id={'add-job-input-field'} fullWidth sx={{width: 'calc(100% - 20px)'}} autoFocus onKeyUp={incrementByEnter}/>
    );
  } else if (curInput.textLabel === 'Incoming Number') {
    return (
      <TextField helperText={curInput.helperText || ''} defaultValue={incomingNumber || curInput.default} label={curInput.textLabel} className="add-job-input-field" id={'add-job-input-field'} fullWidth sx={{width: 'calc(100% - 20px)'}} autoFocus onKeyUp={incrementByEnter}/>
    );
  } 
};

const VoltageEntry = (props) => {
  const {curInput, incrementByEnter, incrementIndex, voltage} = props;

  const setVoltage = (value) => {
    document.getElementById('add-job-input-field').value = value;
    incrementIndex();
  };

  return <div className='append-job-voltage-options'>
    <TextField sx={{width: '16% !important'}} disbaled defaultValue={ voltage?.toString() || ''} label={curInput.textLabel} className="add-job-input-field" id={'add-job-input-field'} fullWidth autoFocus onKeyUp={incrementByEnter}/>
    <Button variant='outlined' sx={{marginLeft: '4%', width: '10%', height:'55px'}} onClick={() => setVoltage('460')}>460</Button>
    <Button variant='outlined' sx={{marginLeft: '4%', width: '10%', height:'55px'}} onClick={() => setVoltage('208')}>208</Button>
    <Button variant='outlined' sx={{marginLeft: '4%', width: '10%', height:'55px'}} onClick={() => setVoltage('MULTI')}>MULTI</Button>
    <Button variant='outlined' sx={{marginLeft: '4%', width: '10%', height:'55px'}} onClick={() => setVoltage('OPEN')}>OPEN</Button>
    <Button variant='outlined' sx={{marginLeft: '4%', width: '10%', height:'55px'}} onClick={() => setVoltage('208/230')}>208/230</Button>
    <Button variant='outlined' sx={{marginLeft: '4%', width: '10%', height:'55px'}} onClick={() => setVoltage('575')}>575</Button>
  </div>
};

const UnloadersEntry = (props) => {
  const {curInput, incrementByEnter, incrementIndex, unloaders} = props;

  const setUnloaders = (value) => {
    document.getElementById('add-job-input-field').value = value;
    incrementIndex();
  };

  return <div>
    <TextField sx={{width: '16% !important'}} disabled defaultValue={ unloaders?.toString() || ''} label={curInput.textLabel} className="add-job-input-field" id={'add-job-input-field'} fullWidth autoFocus onKeyUp={incrementByEnter}/>
    <Button variant='outlined' sx={{marginLeft: '4%', width: '10%', height:'55px'}} onClick={() => setUnloaders(0)}>0</Button>
    <Button variant='outlined' sx={{marginLeft: '4%', width: '10%', height:'55px'}} onClick={() => setUnloaders(1)}>1</Button>
    <Button variant='outlined' sx={{marginLeft: '4%', width: '10%', height:'55px'}} onClick={() => setUnloaders(2)}>2</Button>
    <Button variant='outlined' sx={{marginLeft: '4%', width: '10%', height:'55px'}} onClick={() => setUnloaders('?')}>?</Button>
  </div>
};

const StatorStatusEntry = (props) => {
  const {curInput, incrementByEnter, incrementIndex, statorStatus} = props;

  const setStatorStatus = (value) => {
    document.getElementById('add-job-input-field').value = value;
    incrementIndex();
  };

  return <div>
    <TextField sx={{width: '20% !important'}} disabled defaultValue={ statorStatus?.toString() || ''} label={curInput.textLabel} className="add-job-input-field" id={'add-job-input-field'} fullWidth autoFocus onKeyUp={incrementByEnter}/>
    <Button variant='outlined' sx={{marginLeft: '4%', width: '10%', height:'55px'}} onClick={() => setStatorStatus('GOOD')}>GOOD</Button>
    <Button variant='outlined' sx={{marginLeft: '4%', width: '10%', height:'55px'}} onClick={() => setStatorStatus('BAD')}>BAD</Button>
    <Button variant='outlined' sx={{marginLeft: '4%', width: '10%', height:'55px'}} onClick={() => setStatorStatus('?')}>?</Button>
  </div>
};

const WarrantyEntry = (props) => {
  const {curInput, incrementByEnter, incrementIndex, warranty} = props;

  const setUnloaders = (value) => {
    document.getElementById('add-job-input-field').value = value;
    incrementIndex();
  };

  return <div>
    <TextField sx={{width: '16% !important'}} disabled defaultValue={ warranty?.toString() || ''} label={curInput.textLabel} className="add-job-input-field" id={'add-job-input-field'} fullWidth autoFocus onKeyUp={incrementByEnter}/>
    <Button variant='outlined' sx={{marginLeft: '4%', width: '10%', height:'55px'}} onClick={() => setUnloaders('YES')}>YES</Button>
    <Button variant='outlined' sx={{marginLeft: '4%', width: '10%', height:'55px'}} onClick={() => setUnloaders('NO')}>NO</Button>
    <Button variant='outlined' sx={{marginLeft: '4%', width: '10%', height:'55px'}} onClick={() => setUnloaders('?')}>?</Button>
  </div>
};

module.exports = AppendJobModal;