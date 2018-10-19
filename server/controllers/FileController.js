const csv = require('csvtojson');
const User = require('../models/User');

exports.filter = async (req, res) => {
  const dataArray = await csv().fromString(req.file.buffer.toString('utf8'));

  const resultArray = [];

  await dataArray.map(async (data) => {
    if (data.email) {
      const user = await User.findOne({ 
        'info.email': data.email
      });

      if (user) {
        await user.domain.map((x) => {
          if (x.domainId.toString() === req.body.domainId.toString()) {
            resultArray.push(data);
            return;
          }
        });
      }
    }
    else if (data.phone) {
      const user = await User.findOne({ 
        'info.phone': data.phone
      });

      if (user) {
        await user.domain.map((x) => {
          if (x.domainId.toString() === req.body.domainId.toString()) {
            resultArray.push(data);
            return;
          }
        });
      }
    }
  });

  setTimeout(() => {
    console.log(resultArray);
    res.json(resultArray);
  }, 2500);

};

