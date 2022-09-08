const React = require('react');
const { TextField } = require('@mui/material');

module.exports = ({
  sheetName,
  lead3_1,
  setLead3_1,
  lead3_2,
  setLead3_2,
  lead3_3,
  setLead3_3,
  lead6_1,
  setLead6_1,
  lead6_2,
  setLead6_2,
  lead6_3,
  setLead6_3,
  lead9_440_1,
  lead9_440_2,
  lead9_440_3,
  lead9_208_1,
  lead9_208_2,
  lead9_208_3,
  setLead9_440_1,
  setLead9_440_2,
  setLead9_440_3,
  setLead9_208_1,
  setLead9_208_2,
  setLead9_208_3}) => {
  return (
    <div className={`${sheetName}-lead-testing`}>

    <LeadTest 
      sheetName={sheetName}
      header="3 LEAD MOTOR ONLY"
      t1="LEAD # 1-2"
      t2="LEAD # 2-3"
      t3="LEAD # 3-1"
      f1={lead3_1}
      setF1={setLead3_1}
      f2={lead3_2}
      setF2={setLead3_2}
      f3={lead3_3}
      setF3={setLead3_3}
    />

    <LeadTest 
      sheetName={sheetName}
      header="6 LEAD MOTOR"
      t1="1-2"
      t2="2-3"
      t3="3-1"
      t4="7-8"
      t5="8-9"
      t6="9-7"
      f1={lead6_1}
      setF1={setLead6_1}
      f2={lead6_2}
      setF2={setLead6_2}
      f3={lead6_3}
      setF3={setLead6_3}
    />

    <LeadTest 
      sheetName={sheetName}
      header="9 LEAD 440V"
      t1="1-2"
      t2="2-3"
      t3="3-1"
      t4="7-4"
      t5="8-5"
      t6="9-6"
      f1={lead9_440_1}
      f2={lead9_440_2}
      f3={lead9_440_3}
      setF1={setLead9_440_1}
      setF2={setLead9_440_2}
      setF3={setLead9_440_3}
    />

    <LeadTest 
      sheetName={sheetName}
      header="9 LEAD 208V"
      t1="1-7"
      t2="2-8"
      t3="3-9"
      t4="4"
      t5="5"
      t6="6"
      f1={lead9_208_1}
      f2={lead9_208_2}
      f3={lead9_208_3}
      setF1={setLead9_208_1}
      setF2={setLead9_208_2}
      setF3={setLead9_208_3}
    />
  </div>
  );
};

const LeadTest = ({header, sheetName, t1,t2,t3,t4,t5,t6, f1, f2, f3, setF1, setF2, setF3}) => {
  return (
    <div className={`${sheetName}-lead-test`}>
      <div className={`${sheetName}-lead-test-text`}>{header}</div>

      <div className={`${sheetName}-lead-number-field`}>
        <div className={`${sheetName}-lead-number-field-text`}>{t1}</div>
        <div className={`${sheetName}-lead-number-field-input`}> 
          <TextField variant='standard' defaultValue={f1} onChange={(e) => setF1(e.target.value.toUpperCase())}/> 
        </div>
        <div className={`${sheetName}-lead-number-field-text`}>{t4}</div>
      </div>
      
      <div className={`${sheetName}-lead-number-field`}>
        <div className={`${sheetName}-lead-number-field-text`}>{t2}</div>
        <div className={`${sheetName}-lead-number-field-input`}> 
          <TextField variant='standard' defaultValue={f2} onChange={(e) => setF2(e.target.value.toUpperCase())}/> 
        </div>
        <div className={`${sheetName}-lead-number-field-text`}>{t5}</div>
      </div>
      
      <div className={`${sheetName}-lead-number-field`}>
        <div className={`${sheetName}-lead-number-field-text`}>{t3}</div>
        <div className={`${sheetName}-lead-number-field-input`}> 
          <TextField variant='standard' defaultValue={f3} onChange={(e) => setF3(e.target.value.toUpperCase())}/> 
        </div>
        <div className={`${sheetName}-lead-number-field-text`}>{t6}</div>
      </div>
    </div>
  );
};