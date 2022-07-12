const path = require('path');
const publicUrl = path.join('..', 'public');

// Send HTML page
const sendHtml = (req, res) => {
  res.sendFile(path.join(publicUrl, 'index.html'));
};

module.exports = {
  sendHtml,
};