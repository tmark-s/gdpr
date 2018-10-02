const mongoose = require('mongoose');

exports.init = () => {
  mongoose.connect('mongodb://admin:password@db:27017/test')
    .then(
      () => console.log("Connect to database successful"),
      err => console.log(err)
  );
}
