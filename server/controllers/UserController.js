const User = require('../models/User');

exports.create = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  }
  catch (error) {
    res.status(500).json(error);
  }
};

exports.find = async (req, res) => {
  try {
    const user = await User.find({
      info: {
        link: req.query.link
      }
    });
    res.json(user)
  }
  catch (error) {
    res.status(500).json(error);
  }
};
