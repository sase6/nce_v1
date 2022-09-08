const React = require('react');
const { TextField } = require('@mui/material');

module.exports = ({sheetName}) => {
  return (
    <div className={`${sheetName}-lead-testing`}>

    <LeadTest 
      sheetName={sheetName}
      header="3 LEAD MOTOR ONLY"
      t1="LEAD # 1-2"
      t2="LEAD # 2-3"
      t3="LEAD # 3-1"
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
          <TextField variant='standard' /> 
        </div>
        <div className={`${sheetName}-lead-number-field-text`}>{t4}</div>
      </div>
      
      <div className={`${sheetName}-lead-number-field`}>
        <div className={`${sheetName}-lead-number-field-text`}>{t2}</div>
        <div className={`${sheetName}-lead-number-field-input`}> 
          <TextField variant='standard' /> 
        </div>
        <div className={`${sheetName}-lead-number-field-text`}>{t5}</div>
      </div>
      
      <div className={`${sheetName}-lead-number-field`}>
        <div className={`${sheetName}-lead-number-field-text`}>{t3}</div>
        <div className={`${sheetName}-lead-number-field-input`}> 
          <TextField variant='standard' /> 
        </div>
        <div className={`${sheetName}-lead-number-field-text`}>{t6}</div>
      </div>
    </div>
  );
};