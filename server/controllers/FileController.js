const csv = require('csvtojson');
const Domain = require('../models/Domain');

exports.filter = async (req, res) => {
  const dataArray = await csv().fromString(req.file.buffer.toString('utf8'));

  const resultArray = [];

  await dataArray.map((data) => {
    if (data.email) {
      const user = await User.findOne({ 
        'info.email': data.email
      });

      await user.domain.map((x) => {
        if (x.domainId.toString() === req.body.domainId.toString()) {
          resultArray.push(data);
          return;
        }
      });
    }
    else if (data.phone) {
      const user = await User.findOne({ 
        'info.phone': data.phone
      });

      await user.domain.map((x) => {
        if (x.domainId.toString() === req.body.domainId.toString()) {
          resultArray.push(data);
          return;
        }
      });
    }
  });

  res.json(dataArray);
};

