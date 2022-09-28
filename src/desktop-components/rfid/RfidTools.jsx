const React = require('react');
const {useState} = require('react');
const RfidSync = require('./RfidSync.jsx');

const RfidTools = ({page, setAppStatus}) => {
  const [lastSyncInterval, setLastSyncInterval] = useState(null);
  if (page !== 'RFID Tools') {
    if (lastSyncInterval !== null) clearInterval(lastSyncInterval);
    return;
  }

  return (
    <div className="rfid-tools">
      <RfidSync setAppStatus={setAppStatus} page={page} setLastSyncInterval={setLastSyncInterval}/>
    </div>
  );
};

module.exports =  RfidTools;