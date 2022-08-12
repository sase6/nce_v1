const xlsx = require('xlsx');
const path = require('path');
let jobBookUrl = path.join(__dirname, '..', 'public', 'backup', 'jobs.xlsx');

module.exports.writeToFile = (data) => {
  let wb = xlsx.utils.book_new();
  let sheet = xlsx.utils.json_to_sheet(data);
  xlsx.utils.book_append_sheet(wb, sheet, 'JOBS');
  xlsx.writeFile(wb, jobBookUrl);
};

module.exports.extractFromFile = (path) => {
  let wb = xlsx.readFile(path);
  let sheet = wb.Sheets[wb.SheetNames[0]];
  let obj = xlsx.utils.sheet_to_json(sheet);
  return obj;
};