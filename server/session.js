const bcrypt = require('bcrypt');
const db = require('../database/index.js');

class Session {
  constructor() {
    this.data = {
//    @sessionID: () => {username, password}
    }
  }

  async newSessionId() {
    let salt = await bcrypt.genSalt(5);
    let encryptionSalt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(salt, encryptionSalt);
    return hash;
  }

  async insert(idObject/*{username, password}*/) {
    let sessionId = await this.newSessionId();
    this.data[sessionId] = idObject;
    setTimeout(() => {
      this.remove(sessionId);
    }, (1000*60*30));
    return sessionId;
  }

  async remove(sessionId) {
    delete this.data[sessionId];
    return true;
  }
};

let session = new Session();
module.exports = session;