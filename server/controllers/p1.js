const { P1 } = require('../../database/controllers.js');

const errorCheck = async (cb, errMsg, res) => {
  try {
    let result = await cb();
    res.end(JSON.stringify(result));
  } catch {
    res.end(errMsg);
  }
};

const save = async (req, res) => {
  const {data} = req.body;
  errorCheck(
    async() => await P1.save(data), 
    'Cannot Save Right Now, Try Refreshing', 
    res
  );
};

const load = async(req, res) => {
  const {jobNumber} = req.params;

  if (jobNumber < 1 || isNaN(jobNumber)) {
    errorCheck(
      async() => await P1.getMostRecent(),
      'Cannot Get Job, Try Refreshing',
      res
    );

  } else {
    errorCheck(
      async() => await P1.find(jobNumber), 
      'Cannot Find Job, Try Refreshing', 
      res
    );
  }

};

module.exports = {
  save, load,
};