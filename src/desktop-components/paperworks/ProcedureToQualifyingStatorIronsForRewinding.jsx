const React = require('react');
const { useState, useEffect } = require('react');
const sheetName = "procedure-to-qualifying-stator-irons-for-rewinding";
const { TextField, FormControl, InputLabel, Select, MenuItem } = require('@mui/material');
const VisualInspection = require('./subcomponents/ProcedureToQualifyingStatorIronsForRewindingVisualInspection.jsx');
const RotorQuestions = require('./subcomponents/ProcedureToQualifyingStatorIronsForRewindingRotorQuestions.jsx');
const Meta = require('./subcomponents/ProcedureToQualifyingStatorIronsForRewindingMeta.jsx');
const LeadTesting = require('./subcomponents/ProcedureToQualifyingStatorIronsForRewindingLeadTesting.jsx');
const _CheckBox = require('./subcomponents/_CheckBox.jsx');
const FailedText = require('./subcomponents/FailedText.jsx');

module.exports = (props) => {
  const [modelNumber, setModelNumber] = useState(null);
  const [jobNumber, setJobNumber] = useState(null);
  const [voltage, setVoltage] = useState(null);
  const [leads, setLeads] = useState(null);
  const [imp, setImp] = useState(null);
  const [phase, setPhase] = useState(null);
  const [rotorFitShaft, setRotorFitShaft] = useState(null);
  const [rotorMatchShaft, setRotorMatchShaft] = useState(null);
  const [ironDmgTest, setIronDmgTest] = useState(null);
  const [coreLossTest, setCoreLossTest] = useState(null);
  const [hotSpotTest, setHotSpotTest] = useState(null);
  const [isRewinding, setIsRewinding] = useState('Choose One');
  const [rotorNumber, setRotorNumber] = useState(null);
  const [whoIsWinding, setWhoIsWinding] = useState(null);
  const [megOhm1, setMegOhm1] = useState(null);
  const [megOhm2, setMegOhm2] = useState(null);
  const [megOhm3, setMegOhm3] = useState(null);
  const [act44, setAct44] = useState(null);
  const [act14, setAct14] = useState(null);

  return (
    <div className="procedure-to-qualifying-stator-for-rewinding">
      {/* <div className={`${sheetName}`}></div> */}
      <div className={`${sheetName}-text`}>PROCEDURE TO QUALIFYING STATOR IRONS FOR REWINDING</div>
      <div className={`${sheetName}-sheet`}>

      {/* Model/ Job Number */}
      <div className={`${sheetName}-model-x-job`}>
        <TextField 
          variant='standard' 
          label="MODEL #:"
          defaultValue={modelNumber}
          onClick={(e) => setModelNumber(e.target.value)}
          sx={{
            width: "500px"
          }}
        />
          
        <TextField 
          variant='standard' 
          label="JOB #:"
          defaultValue={jobNumber}
          onClick={(e) => setJobNumber(e.target.value)}
          sx={{
            width: "400px"
          }}
        />
      </div>  

      <Meta 
        voltage={voltage}
        setVoltage={setVoltage}
        leads={leads}
        setLeads={setLeads}
        imp={imp}
        setImp={setImp}
        phase={phase}
        setPhase={setPhase}
        sheetName={sheetName}
      />

      <VisualInspection 
        sheetName={sheetName}
        ironDmgTest={ironDmgTest}
        setIronDmgTest={setIronDmgTest}
        coreLossTest={coreLossTest}
        setCoreLossTest={setCoreLossTest}
        hotSpotTest={hotSpotTest}
        setHotSpotTest={setHotSpotTest}
      />

      <RotorQuestions 
        isRewinding={isRewinding}
        setIsRewinding={setIsRewinding}
        sheetName={sheetName}
        rotorFitShaft={rotorFitShaft}
        rotorMatchShaft={rotorMatchShaft}
        setRotorFitShaft={setRotorFitShaft}
        setRotorMatchShaft={setRotorMatchShaft}
        rotorNumber={rotorNumber}
        setRotorNumber={setRotorNumber}
        whoIsWinding={whoIsWinding}
        setWhoIsWinding={setWhoIsWinding}
      />

      <div className={`${sheetName}-section-2-text`}>
        REQUALIFIED STATOR OR REWOUND STATOR TEST PROCEDURE - RESISTANCE AND SURGE
      </div>

      <div className={`${sheetName}-section-2-instructions-container`}>
        <div className={`${sheetName}-section-2-instruction-text`}>
          Test and fill out the figures below:
        </div>
        <div className={`${sheetName}-section-2-instruction-text-2`}>
          ON 9 LEAD MUST TEST BOTH <br/>
          VOLTAGES
        </div>
      </div>

      <LeadTesting sheetName={sheetName}/>

      <div className={`${sheetName}-meg-ohm-leads`}>
        <TextField defaultValue={megOhm1} onChange={(e) => setMegOhm1(e.target.value)} variant="standard" label="Meg-ohm Leads #1: " sx={{width: '250px'}}/>
        <TextField defaultValue={megOhm2} onChange={(e) => setMegOhm2(e.target.value)} variant="standard" label="#2: " sx={{width: '250px'}}/>
        <TextField defaultValue={megOhm3} onChange={(e) => setMegOhm3(e.target.value)} variant="standard" label="#3: " sx={{width: '250px'}}/>
      </div>

      {/* Acts */}
      <div className={`${sheetName}-act-49`}>
        ACT 49 - Varnish after curing, clean all excess varnish ID and OD of stator iron  
      </div>
      
      <div className={`${sheetName}-act-44`}>
        <span>ACT 44 - Oscilloscope surge test:  </span>
        <_CheckBox value={act44} set={setAct44} sheetName={sheetName} label="Passed"/>
        <FailedText value={act44}/>
      </div>

      <div className={`${sheetName}-act-14`}>
        <span>ACT 14 - Stator Complete: </span>
        <_CheckBox value={act14} set={setAct14} sheetName={sheetName} label="Approved"/>
        <FailedText value={act14} text="NOT APPROVED"/>
      </div>

      {/* Motor Protector */}
      <div className={`${sheetName}-motor-protector-text`}>MOTOR PROTECTOR TERMINALS</div>
      <div className={`${sheetName}-meg-ohm-leads`}>
        <TextField variant="standard" label="SENSORS COMMON TO #S1: " sx={{width: '250px'}}/>
        <TextField variant="standard" label="#S2: " sx={{width: '250px'}}/>
        <TextField variant="standard" label="#S3: " sx={{width: '250px'}}/>
      </div>
      <div className={`${sheetName}-motor-protector-ending-questions`}>
        <TextField variant="standard" label="By Thermal: " sx={{width: '250px'}}/>
        <TextField variant="standard" label="Across Sensor: " sx={{width: '250px'}}/>
      </div>

      </div>

    </div>
  );
};