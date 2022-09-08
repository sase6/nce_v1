const React = require('react');
const { useState, useEffect } = require('react');
const sheetName = "procedure-to-qualifying-stator-irons-for-rewinding";
const { TextField } = require('@mui/material');
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
  const [s1Sensors, setS1Sensors] = useState(null);
  const [s2Sensors, setS2Sensors] = useState(null);
  const [s3Sensors, setS3Sensors] = useState(null);
  const [byThermal, setByThermal] = useState(null);
  const [acrossSensor, setAcrossSensor] = useState(null);
  const [lead3_1, setLead3_1] = useState(null);
  const [lead3_2, setLead3_2] = useState(null);
  const [lead3_3, setLead3_3] = useState(null);
  const [lead6_1, setLead6_1] = useState(null);
  const [lead6_2, setLead6_2] = useState(null);
  const [lead6_3, setLead6_3] = useState(null);
  const [lead9_440_1, setLead9_440_1] = useState(null);
  const [lead9_440_2, setLead9_440_2] = useState(null);
  const [lead9_440_3, setLead9_440_3] = useState(null);
  const [lead9_208_1, setLead9_208_1] = useState(null);
  const [lead9_208_2, setLead9_208_2] = useState(null);
  const [lead9_208_3, setLead9_208_3] = useState(null);

  return (
    <div className="procedure-to-qualifying-stator-for-rewinding">
      <div className={`${sheetName}-text`}>PROCEDURE TO QUALIFYING STATOR IRONS FOR REWINDING</div>
      <div className={`${sheetName}-sheet`}>

      {/* Model/ Job Number */}
      <div className={`${sheetName}-model-x-job`}>
        <TextField 
          variant='standard' 
          label="MODEL #:"
          defaultValue={modelNumber}
          onChange={(e) => setModelNumber(e.target.value)}
          sx={{
            width: "500px"
          }}
        />
          
        <TextField 
          variant='standard' 
          label="JOB #:"
          defaultValue={jobNumber}
          onChange={(e) => setJobNumber(e.target.value)}
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

      <LeadTesting 
        sheetName={sheetName}
        lead3_1={lead3_1}
        setLead3_1={setLead3_1}
        lead3_2={lead3_2}
        setLead3_2={setLead3_2}
        lead3_3={lead3_3}
        setLead3_3={setLead3_3}

        lead6_1={lead6_1}
        setLead6_1={setLead6_1}
        lead6_2={lead6_2}
        setLead6_2={setLead6_2}
        lead6_3={lead6_3}
        setLead6_3={setLead6_3}

        lead9_440_1={lead9_440_1}
        lead9_440_2={lead9_440_2}
        lead9_440_3={lead9_440_3}
        setLead9_440_1={setLead9_440_1}
        setLead9_440_2={setLead9_440_2}
        setLead9_440_3={setLead9_440_3}

        lead9_208_1={lead9_208_1}
        lead9_208_2={lead9_208_2}
        lead9_208_3={lead9_208_3}
        setLead9_208_1={setLead9_208_1}
        setLead9_208_2={setLead9_208_2}
        setLead9_208_3={setLead9_208_3}
      />

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

      <div className={`${sheetName}-motor-protector-text`}>MOTOR PROTECTOR TERMINALS</div>
      <div className={`${sheetName}-meg-ohm-leads`}>
        <TextField defaultValue={s1Sensors} variant="standard" label="SENSORS COMMON TO #S1: " sx={{width: '250px'}} onChange={(e) => setS1Sensors(e.target.value.toUpperCase())}/>
        <TextField defaultValue={s2Sensors} variant="standard" label="#S2: " sx={{width: '250px'}} onChange={(e) => setS2Sensors(e.target.value.toUpperCase())}/>
        <TextField defaultValue={s3Sensors} variant="standard" label="#S3: " sx={{width: '250px'}} onChange={(e) => setS3Sensors(e.target.value.toUpperCase())}/>
      </div>
      <div className={`${sheetName}-motor-protector-ending-questions`}>
        <TextField defaultValue={byThermal} variant="standard" label="By Thermal: " sx={{width: '250px'}} onChange={(e) => setByThermal(e.target.value.toUpperCase())}/>
        <TextField defaultValue={acrossSensor} variant="standard" label="Across Sensor: " sx={{width: '250px'}} onChange={(e) => setAcrossSensor(e.target.value.toUpperCase())}/>
      </div>

      </div>

    </div>
  );
};