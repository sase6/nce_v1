const path = require('path');
const publicUrl = path.join(__dirname, '..', 'public');

// Send HTML page
const sendHtml = (req, res) => {
  res.sendFile(path.join(publicUrl, 'index.html'));
};

const login = (req, res) => {
  const {username, password} = req.body;
  // check if exist
  //if not, send error with reason!
};

module.exports = {
  sendHtml, 
  login,
};