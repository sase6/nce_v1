const React = require('react');
const { TextField } = require('@mui/material');

module.exports = ({voltage, setVoltage, leads, setLeads, imp, setImp, phase, setPhase, sheetName}) => {

  const load = [
    {
      label: "VOLTAGE: ",
      update: setVoltage,
      value: voltage
    },

    {
      label: "LEADS: ",
      update: leads,
      value: setLeads
    },

    {
      label: "IMP: ",
      update: imp,
      value: setImp
    },

    {
      label: "PHASE: ",
      update: phase,
      value: setPhase
    },
  ];

  return (
    <div className={`${sheetName}-volt-meta`}>
    {
      load.map((meta, i) => {
        return (
          <TextField 
            key={`${sheetName}-meta-${i}`}
            variant='standard' 
            label={meta.label}
            defaultValue={meta.value || ""}
            onClick={(e) => meta.update(e.target.value)}
            sx={{
              width: "240px"
            }}
          />
        );
      })
    }
  </div> 
  );
};