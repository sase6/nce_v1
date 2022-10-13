const {RFIDTags} = require("../../database/controllers.js");
const fs = require("fs");
const api = require('./api');

const readerIds = [
  // "B827EB3C1135", // 1900-H
  // "B827EB63FA85", // Dubon-H
  // "B827EB3D721C", // Dubon-H1
  // "B827EBC91692", // Georgia-H1
  // "B827EB873D0D", // Maspeth-H
  // "B827EBFF41D2", // Maspeth-H
  // "B827EBD8148B"  // MaspethDoor
];

class RfidSyncControl {
  constructor() {
    this.syncData = {};
    this.readerSyncInterval = 1800000;
    this.databaseSyncInterval = 2700000;

    this.syncReader();
    try{this.syncDatabase()}catch{}
    setInterval(() => this.syncReader(), this.readerSyncInterval);
    setInterval(() => this.syncDatabase(), this.databaseSyncInterval);
  }

  syncReader(cb) {
    api.pipe(
      // Functions
      [
        api.getSessionKey,
        api.getRecentlyScannedTags,
        api.getCustomTagInfo,
        api.saveTagStatusAndData,
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

  async syncDatabase() {
    console.log("Syncing Recent Data To Database");
    try {
      const data = JSON.parse(fs.readFileSync("./recentTagData.json"));
      const status = await RFIDTags.updateRecords(data);
      console.log(`Synced Database, Status: ${JSON.stringify(status)}`);
      return status;

    } catch (err) {
      console.log("Could Not Read './recentTagData.json'", err);
      return null;
    }
  }

  async syncDatabaseToreader(cb) {
    const customTagData = await RFIDTags.getAll();

    api.pipe(
      // Functions
      [
        api.getSessionKey,
        api.syncToReaders,
      ],

      // Pre Storage
      {
        readersToSync: readerIds,
        customTagData
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

// let RfidControl = new RfidSyncControl();

const syncNow = (req, res) => {
  RfidControl.syncReader((data) => {
    res.end(JSON.stringify(data));
  });
};

const requestSyncData = (req, res) => {
  res.end(JSON.stringify({...RfidControl.syncData, readers: readerIds}));
};

const syncRecentDataToDatabase = async (req, res) => {
  const status = await RfidControl.syncDatabase();
  if (status === null) res.status(500).end("Error Sync To Database");
  else res.end("Good");
};

const syncExternalDataToDatabase = async (req, res) => {
  console.log("Syncing External Data To Database");
  const {data} = req.body;
    try {
      const parsedData = JSON.parse(data);
      const status = await RFIDTags.updateRecords(parsedData);
      console.log(`Synced Database, Status: ${JSON.stringify(status)}`);
      res.end("Good");

    } catch (err) {
      console.log("Could Not Sync Data", err);
      res.status(500).end(err);
    }
};

const syncDatabaseToreader = async(req, res) => {
  console.log("Syncing Database to Readers");
  try {
    await RfidControl.syncDatabaseToreader(() => {
      console.log("Finished Syncing Database to Readers");
      res.end("DONE");
    });
  } catch {
    console.log("Failed to Sync Database to Readers");
    res.status(500).end("Erro Syncing Database to Readers");
  }
};

const readFromDatabase = async(req, res) => {
  const {tagName="ALL", readerName="ALL", jobNumber="ALL", modelNumber="ALL", voltage="ALL", type="ALL", subzone="ALL", page} = req.body;
  const clientQuery = {tagName, readerName, jobNumber, modelNumber, voltage};

  const query = {};
  for (prop in clientQuery) {
    if (clientQuery[prop] !== "" && clientQuery[prop] !== "ALL") query[prop] = clientQuery[prop]
  }

  try {
    const data = await RFIDTags.getAll(query, type, subzone);
    const results = {
      results: data.slice(page*100, (page*100 + 100)),
      amount: data.length
    };

    res.end(JSON.stringify(results));
  } catch {
    res.status(500).end();
  }
};

module.exports = {
  syncNow, requestSyncData, syncRecentDataToDatabase, syncExternalDataToDatabase, syncDatabaseToreader, readFromDatabase
};