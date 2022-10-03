const React = require("react");

const fakeData = {
  readerName: "b74398dw9",
  subzone: "Maspeth In",
  type: "Compressor",
  tagName: "53478",
  jobNumber: 423890,
  modelNumber: "06ds8246bc3200",
  voltage: "multi",
  date: (new Date).toLocaleDateString()
}

module.exports = ({page}) => {
  if (page !== "RFID Log") return;

  return (
    <div className="rfid-log">
      Hello World
    </div>
  );
};