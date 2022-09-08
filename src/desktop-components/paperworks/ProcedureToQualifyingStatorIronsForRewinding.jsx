const React = require('react');
const { useState, useEffect } = require('react');
const sheetName = "procedure-to-qualifying-stator-irons-for-rewinding";
const { TextField, FormControl, InputLabel, Select, MenuItem } = require('@mui/material');
const VisualInspection = require('./subcomponents/ProcedureToQualifyingStatorIronsForRewindingVisualInspection.jsx');
const RotorQuestions = require('./subcomponents/ProcedureToQualifyingStatorIronsForRewindingRotorQuestions.jsx');
const YesNoSelector = require('./subcomponents/YesNoSelector.jsx');

module.exports = (props) => {
  const [rotorFitShaft, setRotorFitShaft] = useState(null);
  const [rotorMatchShaft, setRotorMatchShaft] = useState(null);
  const [ironDmgTest, setIronDmgTest] = useState(null);
  const [coreLossTest, setCoreLossTest] = useState(null);
  const [hotSpotTest, setHotSpotTest] = useState(null);
  const [isRewinding, setIsRewinding] = useState('Choose One');
  const [rotorNumber, setRotorNumber] = useState(null);
  const [whoIsWinding, setWhoIsWinding] = useState(null);

  return (
    <div className="procedure-to-qualifying-stator-for-rewinding">
      {/* <div className={`${sheetName}`}></div> */}
      <div className={`${sheetName}-text`}>PROCEDURE TO QUALIFYING STATOR IRONS FOR REWINDING</div>
      <div className={`${sheetName}-sheet`}>

        {/* MODEL AND JOB */}

        <div className={`${sheetName}-model-x-job`}>
          <TextField 
            variant='standard' 
            label="MODEL #:"
            sx={{
              width: "500px"
            }}
          />
          
          <TextField 
            variant='standard' 
            label="JOB #:"
            sx={{
              width: "400px"
            }}
          />
        </div>  

        {/* VOLTAGE META */}
        
        <div className={`${sheetName}-volt-meta`}>
          <TextField 
            variant='standard' 
            label="VOLTAGE:"
            sx={{
              width: "240px"
            }}
          />
          
          <TextField 
            variant='standard' 
            label="LEADS:"
            sx={{
              width: "240px"
            }}
          />

          <TextField 
            variant='standard' 
            label="IMP:"
            sx={{
              width: "240px"
            }}
          />

          <TextField 
            variant='standard' 
            label="PHASE:"
            sx={{
              width: "240px"
            }}
          />
        </div>   

        <VisualInspection 
          sheetName={sheetName}
          ironDmgTest={ironDmgTest}
          setIronDmgTest={setIronDmgTest}
          coreLossTest={coreLossTest}
          setCoreLossTest={setCoreLossTest}
          hotSpotTest={hotSpotTest}
          setHotSpotTest={setHotSpotTest}
          whoIsWinding={whoIsWinding}
          setWhoIsWinding={setWhoIsWinding}
        />

      {/* ROTOR INFO */}
      {/* <div className={`${sheetName}-rotor-info`}>
        <TextField variant='standard' label='ROTOR #:' sx={{width: '300px'}}/>
        <div>
          <FormControl fullWidth sx={{marginTop: '13px'}}>
            <InputLabel id="rewinding/requalifying-select">Requalify/Rewind</InputLabel>
            <Select
              labelId="rewinding/requalifying-select"
              id="xxx-----doesnt-matter"
              value={isRewinding}
              label="Age"
              onChange={(e) => setIsRewinding(e.target.value)}
              size="small"
              fullWidth
            >
              <MenuItem value={'Choose One'}>Choose One</MenuItem>
              <MenuItem value={'Requalify'}>Requalify</MenuItem>
              <MenuItem value={'Rewind'}>Rewind</MenuItem>
            </Select>
          </FormControl>
        </div>
        <TextField variant='standard' label='WHO IS WINDING?:' sx={{width: '300px'}}/>
      </div>

      <div className={`${sheetName}-rotor-question-1`}>
        <div className="rotor-question">Does the rotor fit on the shaft?</div>
        <YesNoSelector value={rotorFitShaft} set={setRotorFitShaft} />
        <div></div>
      </div>

      <div className={`${sheetName}-rotor-question-2`}>
        <div className="rotor-question">Does the rotor match the stator?</div>
        <YesNoSelector value={rotorMatchShaft} set={setRotorMatchShaft}/>
        <div>IF "NO", <strong>DO NOT</strong> REWIND</div>
      </div> */}
      <RotorQuestions 
        isRewinding={isRewinding}
        setIsRewinding={setIsRewinding}
        sheetName={sheetName}
        rotorFitShaft={rotorFitShaft}
        rotorMatchShaft={rotorMatchShaft}
        setRotorFitShaft={setRotorFitShaft}
        setRotorMatchShaft={setRotorMatchShaft}
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

      {/* LEAD MOTOR TESTING */}
      <div className={`${sheetName}-lead-testing`}>

        <div className={`${sheetName}-lead-test`}>
          <div className={`${sheetName}-lead-test-text`}>3 LEAD MOTOR ONLY</div>
 
          <div className={`${sheetName}-lead-number-field`}>
            <div className={`${sheetName}-lead-number-field-text`}>LEAD # 1-2: </div>
            <div className={`${sheetName}-lead-number-field-input`}> <TextField variant='standard' /> </div>
          </div>
          <div className={`${sheetName}-lead-number-field`}>
            <div className={`${sheetName}-lead-number-field-text`}>LEAD # 2-3: </div>
            <div className={`${sheetName}-lead-number-field-input`}> <TextField variant='standard' /> </div>
          </div>
          <div className={`${sheetName}-lead-number-field`}>
            <div className={`${sheetName}-lead-number-field-text`}>LEAD # 3-4: </div>
            <div className={`${sheetName}-lead-number-field-input`}> <TextField variant='standard' /> </div>
          </div>
        </div>

        <div className={`${sheetName}-lead-test`}>
          <div className={`${sheetName}-lead-test-text`}>6 LEAD MOTOR</div>
 
          <div className={`${sheetName}-lead-number-field`}>
            <div className={`${sheetName}-lead-number-field-text`}>1-2: </div>
            <div className={`${sheetName}-lead-number-field-input`}> <TextField variant='standard' /> </div>
          </div>
          <div className={`${sheetName}-lead-number-field`}>
            <div className={`${sheetName}-lead-number-field-text`}>2-3: </div>
            <div className={`${sheetName}-lead-number-field-input`}> <TextField variant='standard' /> </div>
          </div>
          <div className={`${sheetName}-lead-number-field`}>
            <div className={`${sheetName}-lead-number-field-text`}>3-1: </div>
            <div className={`${sheetName}-lead-number-field-input`}> <TextField variant='standard' /> </div>
          </div>
        </div>

        <div className={`${sheetName}-lead-test`}>
          <div className={`${sheetName}-lead-test-text`}>9 LEAD 440V</div>
 
          <div className={`${sheetName}-lead-number-field`}>
            <div className={`${sheetName}-lead-number-field-text`}>1-2: </div>
            <div className={`${sheetName}-lead-number-field-input`}> <TextField variant='standard' /> </div>
          </div>
          <div className={`${sheetName}-lead-number-field`}>
            <div className={`${sheetName}-lead-number-field-text`}>2-3: </div>
            <div className={`${sheetName}-lead-number-field-input`}> <TextField variant='standard' /> </div>
          </div>
          <div className={`${sheetName}-lead-number-field`}>
            <div className={`${sheetName}-lead-number-field-text`}>3-1: </div>
            <div className={`${sheetName}-lead-number-field-input`}> <TextField variant='standard' /> </div>
          </div>
        </div>

        <div className={`${sheetName}-lead-test`}>
          <div className={`${sheetName}-lead-test-text`}>9 LEAD 208V</div>
 
          <div className={`${sheetName}-lead-number-field`}>
            <div className={`${sheetName}-lead-number-field-text`}>1-2: </div>
            <div className={`${sheetName}-lead-number-field-input`}> <TextField variant='standard' /> </div>
          </div>
          <div className={`${sheetName}-lead-number-field`}>
            <div className={`${sheetName}-lead-number-field-text`}>2-3: </div>
            <div className={`${sheetName}-lead-number-field-input`}> <TextField variant='standard' /> </div>
          </div>
          <div className={`${sheetName}-lead-number-field`}>
            <div className={`${sheetName}-lead-number-field-text`}>3-1: </div>
            <div className={`${sheetName}-lead-number-field-input`}> <TextField variant='standard' /> </div>
          </div>
        </div>
      </div>

      {/* MEG OHM LEADS */}

      <div className={`${sheetName}-meg-ohm-leads`}>
        <TextField variant="standard" label="Meg-ohm Leads #1: " sx={{width: '250px'}}/>
        <TextField variant="standard" label="#2: " sx={{width: '250px'}}/>
        <TextField variant="standard" label="#3: " sx={{width: '250px'}}/>
      </div>

      {/* Acts */}
      <div className={`${sheetName}-act-49`}>
        ACT 49 - Varnish after curing, clean all excess varnish ID and OD of stator iron  
      </div>
      
      <div className={`${sheetName}-act-44`}>
        ACT 44 - Oscilloscope surge test: pass/fail?  
      </div>

      <div className={`${sheetName}-act-14`}>
        ACT 14 - Stator Complete: APPROVED? 
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