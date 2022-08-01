const bcrypt = require('bcrypt');
module.exports = class Session {
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
    return sessionId;
  }

  async remove(sessionId) {
    delete this.data[sessionId];
    return true;
  }
};