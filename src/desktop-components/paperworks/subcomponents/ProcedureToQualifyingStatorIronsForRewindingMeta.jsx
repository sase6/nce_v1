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
      update: setLeads,
      value: leads
    },

    {
      label: "IMP: ",
      update: setImp,
      value: imp
    },

    {
      label: "PHASE: ",
      update: setPhase,
      value: phase
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
            value={meta.value || ""}
            InputLabelProps={{shrink: true}}
            onChange={(e) => meta.update(e.target.value)}
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