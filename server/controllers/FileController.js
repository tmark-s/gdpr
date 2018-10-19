const csv = require('csvtojson');
const fs = require('fs');
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
    const file = fs.createWriteStream('test.csv');
    file.once('open', async () => {
      await resultArray.forEach((user) => {
        file.write(user.email + ", " + user.phone + "\n");
      });
    });
    // res.setHeader("Content-Type", "application/csv");
    // res.setHeader( "Content-Disposition", "attachment; filename=" + file.path);
    res.pipe(file);
  }, 2500);
};

