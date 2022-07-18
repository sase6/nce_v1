const createHardKey = (length=25) => {
  let options = 'abhijklmnopqrstuvwH^&*()_IJKLMNOPcdefgQRSTUVWXYZ12345678TUVWXY90-=][/.,^&*()_+}{|?><:"xyzABCDEFG';
  let string = '';
  while (string.length < length) {
    let index = Math.floor(Math.random() * options.length);
    string += options[index] || '@f';
  }
  return string;
};

module.exports = createHardKey;