const React = require("react");
const xlsx = require('xlsx');
const axios = require("axios");

module.exports = () => {

  const syncFileToDatabase = (event) => {
    const file = event.target.files[0];
    if (!file) console.log("no such file selected");
    else {
      var reader = new FileReader();
	  reader.onload = function(e) {
        const binaryData = e.target.result;

        let wb = xlsx.read(binaryData, {type: "binary"});
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = xlsx.utils.sheet_to_json(ws);

        axios({
          method: "post",
          url: "/rfrain/database/sync/external",
          data: {data: JSON.stringify(json)}
        })
        .then(({data}) => {
          console.log("Saved files to database");
          console.log(data);
        })
        .catch(err => console.log("Error saving file to database!", {err}));
      };

	  reader.onerror = function(e) {
	    console.log("Error reading file");
	  };

	  reader.readAsBinaryString(file);
    }
  };

  return (
    <div className="rfid-database-sync-container">
      <div className="rfid-sync-header">RFID Database Sync</div>
      <div className="rfrid-sync-last-updated">{`Last Synced at: ${'date'}`}</div>
      <input type="file" onChange={syncFileToDatabase}/>
    </div>
  );
};