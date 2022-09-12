const React = require('react');
const { useState, useEffect, useRef } = require('react');
const sheetName = "procedure-to-qualifying-stator-irons-for-rewinding";
const { TextField, Button } = require('@mui/material');
const VisualInspection = require('./subcomponents/ProcedureToQualifyingStatorIronsForRewindingVisualInspection.jsx');
const RotorQuestions = require('./subcomponents/ProcedureToQualifyingStatorIronsForRewindingRotorQuestions.jsx');
const Meta = require('./subcomponents/ProcedureToQualifyingStatorIronsForRewindingMeta.jsx');
const LeadTesting = require('./subcomponents/ProcedureToQualifyingStatorIronsForRewindingLeadTesting.jsx');
const _CheckBox = require('./subcomponents/_CheckBox.jsx');
const FailedText = require('./subcomponents/FailedText.jsx');

module.exports = ({preset, saveDocument, documentStatus, setDocumentStatus}) => {
  const [modelNumber, setModelNumber] = useState(preset.modelNumber);
  const [jobNumber, setJobNumber] = useState(preset?.jobNumber || null);
  const [voltage, setVoltage] = useState(preset?.voltage || null);
  const [leads, setLeads] = useState(preset?.leads || null);
  const [imp, setImp] = useState(preset?.imp|| null);
  const [phase, setPhase] = useState(preset?.phase || null);
  const [rotorFitShaft, setRotorFitShaft] = useState(preset?.rotorFitShaft !== undefined? preset.rotorFitShaft : null);
  const [rotorMatchShaft, setRotorMatchShaft] = useState(preset?.rotorMatchShaft !== undefined? preset.rotorMatchShaft : null);
  const [ironDmgTest, setIronDmgTest] = useState(preset?.ironDmgTest || null);
  const [coreLossTest, setCoreLossTest] = useState(preset?.coreLossTest || null);
  const [hotSpotTest, setHotSpotTest] = useState(preset?.hotSpotTest || null);
  const [isRewinding, setIsRewinding] = useState(preset?.isRewinding || 'Choose One');
  const [rotorNumber, setRotorNumber] = useState(preset?.rotorNumber || null);
  const [whoIsWinding, setWhoIsWinding] = useState(preset?.whoIsWinding || null);
  const [megOhm1, setMegOhm1] = useState(preset?.megOhm1 || null);
  const [megOhm2, setMegOhm2] = useState(preset?.megOhm2 || null);
  const [megOhm3, setMegOhm3] = useState(preset?.megOhm3 || null);
  const [act44, setAct44] = useState(preset?.act44 || null);
  const [act14, setAct14] = useState(preset?.act14 || null);
  const [s1Sensors, setS1Sensors] = useState(preset?.s1Sensors ||null);
  const [s2Sensors, setS2Sensors] = useState(preset?.s2Sensors || null);
  const [s3Sensors, setS3Sensors] = useState(preset?.s3Sensors || null);
  const [byThermal, setByThermal] = useState(preset?.byThermal || null);
  const [acrossSensor, setAcrossSensor] = useState(preset?.acrossSensor || null);
  const [lead3_1, setLead3_1] = useState(preset?.lead3_1 || null);
  const [lead3_2, setLead3_2] = useState(preset?.lead3_2 || null);
  const [lead3_3, setLead3_3] = useState(preset?.lead3_3 || null);
  const [lead6_1, setLead6_1] = useState(preset?.lead6_1 || null);
  const [lead6_2, setLead6_2] = useState(preset?.lead6_2 || null);
  const [lead6_3, setLead6_3] = useState(preset?.lead6_3 || null);
  const [lead9_440_1, setLead9_440_1] = useState(preset?.setLead9_440_1 || null);
  const [lead9_440_2, setLead9_440_2] = useState(preset?.setLead9_440_2 || null);
  const [lead9_440_3, setLead9_440_3] = useState(preset?.setLead9_440_3 || null);
  const [lead9_208_1, setLead9_208_1] = useState(preset?.setLead9_208_1 || null);
  const [lead9_208_2, setLead9_208_2] = useState(preset?.setLead9_208_2 || null);
  const [lead9_208_3, setLead9_208_3] = useState(preset?.setLead9_208_3 || null);

  const getSetStates = () => {
    return {
      setModelNumber, setJobNumber, setVoltage, setLeads, setImp, setPhase, setRotorFitShaft,
      setRotorMatchShaft, setIronDmgTest, setCoreLossTest, setHotSpotTest, setIsRewinding, setRotorNumber,
      setWhoIsWinding, setMegOhm1, setMegOhm2, setMegOhm3, setAct14, setAct44, setByThermal, setAcrossSensor,
      setLead3_1, setLead3_2, setLead3_3, setLead6_1, setLead6_2, setLead6_3, setLead9_208_1, setLead9_208_2, setLead9_208_3,
      setLead9_440_1, setLead9_440_2, setLead9_440_3, setS1Sensors, setS2Sensors, setS3Sensors
    };
  };

  const getStateNameFromString = (setString) => {
    let partedString = setString.slice(4);
    return setString[3].toLowerCase() + partedString;
  };

  useEffect(() => {
    let setStateObj = getSetStates();
    for (key in setStateObj) {
      let presetKey = getStateNameFromString(key);
      setStateObj[key](preset[presetKey] || "");
    }

    if (!preset.isRewinding) setIsRewinding('Choose One');
    if (preset.rotorFitShaft === undefined || preset.rotorFitShaft === "") setRotorFitShaft(null)
    if (preset.rotorMatchShaft === undefined || preset.rotorMatchShaft === "") setRotorMatchShaft(null)
    if (!preset.act14 && preset.act14 !== false) setAct14(null);
    if (!preset.act44 && preset.act44 !== false) setAct44(null);
    if (!preset.ironDmgTest && preset.ironDmgTest !== false) setIronDmgTest(null);
    if (!preset.coreLossTest && preset.coreLossTest !== false) setCoreLossTest(null);
    if (!preset.hotSpotTest && preset.hotSpotTest !== false) setHotSpotTest(null);
  }, [preset]);

  // Save Data
  useEffect(() => {
    if (documentStatus === 'save') {
      data = {data: {
        modelNumber, jobNumber, voltage, leads, imp, phase, rotorFitShaft,
        rotorMatchShaft, ironDmgTest, coreLossTest, hotSpotTest, isRewinding, rotorNumber,
        whoIsWinding, megOhm1, megOhm2, megOhm3, act14, act44, byThermal, acrossSensor,
        lead3_1, lead3_2, lead3_3, lead6_1, lead6_2, lead6_3, lead9_208_1, lead9_208_2, lead9_208_3,
        lead9_440_1, lead9_440_2, lead9_440_3, s1Sensors, s2Sensors, s3Sensors
      }};

      saveDocument(data, false, () => setDocumentStatus('saved'));
    }
  }, [documentStatus]);

  return (
    <div className="procedure-to-qualifying-stator-for-rewinding">
      <P1Overlay preset={preset} saveDocument={saveDocument}/>
      <div className={`${sheetName}-text`}>PROCEDURE TO QUALIFYING STATOR IRONS FOR REWINDING</div>
      <div className={`${sheetName}-sheet`}>

      {/* Model/ Job Number */}
      <div className={`${sheetName}-model-x-job`}>
        <TextField 
          variant='standard' 
          label="MODEL #:"
          value={modelNumber}
          onChange={(e) => setModelNumber(e.target.value)}
          InputLabelProps={{shrink: true}}
          sx={{
            width: "500px"
          }}
        />
          
        <TextField 
          variant='standard' 
          label="JOB #:"
          value={jobNumber}
          onChange={(e) => e.preventDefault()}
          InputLabelProps={{shrink: true}}
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
        <TextField InputLabelProps={{shrink: true}} value={megOhm1} onChange={(e) => setMegOhm1(e.target.value)} variant="standard" label="Meg-ohm Leads #1: " sx={{width: '250px'}}/>
        <TextField InputLabelProps={{shrink: true}} value={megOhm2} onChange={(e) => setMegOhm2(e.target.value)} variant="standard" label="#2: " sx={{width: '250px'}}/>
        <TextField InputLabelProps={{shrink: true}} value={megOhm3} onChange={(e) => setMegOhm3(e.target.value)} variant="standard" label="#3: " sx={{width: '250px'}}/>
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
        <TextField InputLabelProps={{shrink: true}} value={s1Sensors} variant="standard" label="SENSORS COMMON TO #S1: " sx={{width: '250px'}} onChange={(e) => setS1Sensors(e.target.value)}/>
        <TextField InputLabelProps={{shrink: true}} value={s2Sensors} variant="standard" label="#S2: " sx={{width: '250px'}} onChange={(e) => setS2Sensors(e.target.value)}/>
        <TextField InputLabelProps={{shrink: true}} value={s3Sensors} variant="standard" label="#S3: " sx={{width: '250px'}} onChange={(e) => setS3Sensors(e.target.value)}/>
      </div>
      <div className={`${sheetName}-motor-protector-ending-questions`}>
        <TextField InputLabelProps={{shrink: true}} value={byThermal} variant="standard" label="By Thermal: " sx={{width: '250px'}} onChange={(e) => setByThermal(e.target.value.toUpperCase())}/>
        <TextField InputLabelProps={{shrink: true}} value={acrossSensor} variant="standard" label="Across Sensor: " sx={{width: '250px'}} onChange={(e) => setAcrossSensor(e.target.value.toUpperCase())}/>
      </div>

      </div>

    </div>
  );
};

const P1Overlay = ({preset, saveDocument}) => {
  const el = useRef(null);

  useEffect(() => {
    console.log(preset);
    if (preset.jobNumber) {
      el.current.style.backdropFilter = "none";
      el.current.style.background = "none";      
      el.current.style.visibility = "hidden";      
      el.current.style.opacity = "0";      
    } else {
      el.current.style.backdropFilter = "blur(3px)";
      el.current.style.background = "rgba(255,255,255,0.5)";      
      el.current.style.visibility = "visible";      
      el.current.style.opacity = "1";      
    }
  }, [preset]);
  
  return (
    <div className="p1-overlay" ref={el}>
      <div className="p1-overlay-message">
        <div className="p1-overlay-message-text">ENTRY DOES NOT EXIST</div>
        <div className="p1-overlay-create-new-button">
          <Button variant='outlined' onClick={() => saveDocument(null, true)}>Create New</Button>
        </div>
      </div>
    </div>
  );
};