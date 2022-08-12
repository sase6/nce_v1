const xlsx = require('xlsx');

module.exports.writeToFile = (data) => {
  let wb = xlsx.utils.book_new();
  let sheet = xlsx.utils.json_to_sheet(data);
  xlsx.utils.book_append_sheet(wb, sheet, 'JOBS');
  xlsx.writeFile(wb, '../backup/jobs.xlsx');
};