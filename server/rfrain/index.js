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

  sync() {
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
        console.log(data.sync);
        this.syncData = data.sync;
      }
    );
  }
};

new RfidSyncControl();