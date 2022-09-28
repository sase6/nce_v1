const api = require('./api');

const readerIds = [
  "B827EB3C1135", // 1900-H
  "B827EB63FA85", // Dubon-H
  "B827EB3D721C", // Dubon-H1
  "B827EBC91692", // Georgia-H1
  "B827EB873D0D", // Maspeth-H
  "B827EBFF41D2", // Maspeth-H
  "B827EBD8148B"  // MaspethDoor
];

class RfidSyncControl {
  constructor() {
    this.syncData = {};
    this.syncInterval = 180000;

    setInterval(() => this.sync(), this.syncInterval);
  }

  sync(cb) {
    api.pipe(
      // Functions
      [
        api.getSessionKey,
        api.getRecentlyScannedTags,
        api.getCustomTagInfo,
        api.syncToReaders,
      ],

      // Pre Storage
      {
        readersToSync: readerIds
      },

      // Error Handler
      (err) => {
        console.log('Error Syncing RFID', err);
      },

      // Success Handler
      (data) => {
        this.syncData = data.sync;
        if (cb) cb(data.sync);
      }
    );
  }
};

let RfidControl = new RfidSyncControl();

const syncNow = (req, res) => {
  RfidControl.sync((data) => {
    res.end(JSON.stringify(data));
  });
};

const requestSyncData = (req, res) => {
  res.end(JSON.stringify({...RfidControl.syncData, readers: readerIds}));
};

module.exports = {
  syncNow, requestSyncData,
};