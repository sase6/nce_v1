const React = require('react');
const {useState, useEffect} = require('react');
const {Button} = require('@mui/material');
const axios = require('axios');

const RfidSync = ({setAppStatus, setLastSyncInterval}) => {
  const [date, setDate] = useState("TBD");
  const [isSyncing, setIsSyncing] = useState(false);
  
  const syncData = async() => {
    if (isSyncing) {
      setAppStatus({type: 'error', msg: 'Reader is Already Syncing'});
      return;
    }

    try {
      setIsSyncing(true);
      setAppStatus({type: 'success', msg: 'Syncing Readers Now'});
      const {data} = await axios.get('/rfrain/sync');
      setIsSyncing(false);
      setDate(data.time);
      setAppStatus({type: 'success', msg: 'Readers Successfully Synced'});
    } catch {
      setAppStatus({type: 'error', msg: 'Failedd To Sync Reader'});
    }
  };

  const updateLastSyncedTime = async () => {
    setAppStatus({type: 'success', msg: 'Getting Last Sync Time'});
    try {
      let {data} = await axios.get('/rfrain/sync/data');
      setDate(data.time || "NOT YET SYNCED");
      setAppStatus({type: 'success', msg: 'Updated Last Synced Time'});
    } catch {
      setAppStatus({type: 'error', msg: 'Failed To Update Last Synced Time'});
    }
  }

  useEffect(() => {
    updateLastSyncedTime();
    setLastSyncInterval(setInterval(async () => await updateLastSyncedTime(), 15000));
    return;
  }, []);

  return (
    <div className="rfid-sync">
      <div className="rfid-sync-header">RFID SYNC</div>
      <div className="rfrid-sync-last-updated">{`LAST SYNC: ${date}`}</div>
     
      <div className="rfid-sync-reader-list">
        <div className="rfid-reader-id">B827EB3C1135</div>
        <div className="rfid-reader-name">1900-H</div>
        <div className="rfid-reader-id">B827EB63FA85</div>
        <div className="rfid-reader-name">DUBON-H</div>
        <div className="rfid-reader-id">B827EB3D721C</div>
        <div className="rfid-reader-name">DUBON-H1</div>
        <div className="rfid-reader-id">B827EBC91692</div>
        <div className="rfid-reader-name">GEORGIA-H1</div>
        <div className="rfid-reader-id">B827EB873D0D</div>
        <div className="rfid-reader-name">MASPETH-H</div>
        <div className="rfid-reader-id">B827EBFF41D2</div>
        <div className="rfid-reader-name">MASPETH-H</div>
        <div className="rfid-reader-id">B827EBD8148B</div>
        <div className="rfid-reader-name">MASPETH-DOOR</div>
      </div>

      <div className="sync-reader-button-container">
        <Button variant="outlined" size="small" onClick={syncData}>Sync DB</Button>
      </div>
    </div>
  );
};

module.exports =  RfidSync;