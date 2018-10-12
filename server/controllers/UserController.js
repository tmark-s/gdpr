const User = require('../models/User');
const Domain = require('../models/Domain');
const hash = require('object-hash');

exports.create = async (req, res) => {
  const findUser = await User.findOne({
    'info.email': req.body.email
  });

  if (!findUser) {
    const domain = await Domain.findOne({
      name: req.body.domain
    });
  
    const emailSubscribe = [];
    await domain.emailSubscribe.category.map((category) => {
      emailSubscribe.push(category.value);
    });
    
    const smsSubscribe = [];
    await domain.smsSubscribe.category.map((category) => {
      smsSubscribe.push(category.value);
    });
  
    const snooze = {
      isSnooze: false,
      startDate: "",
      endDate: ""
    };
  
    const addDomain = {};
    addDomain.name = req.body.domain;
    addDomain.emailSubscribe = emailSubscribe;
    addDomain.smsSubscribe = smsSubscribe;
    addDomain.phoneSubscribe = false
    addDomain.snooze = snooze;
  
    const userDetail = [];
    userDetail.push(addDomain);
  
    const newUser = new User();
    newUser.domain = userDetail;
  
    await newUser.save();
  
    const user = hash(newUser._id.toString());
  
    const info = {
      email: req.body.email,
      user: user
    };
  
    newUser.info = info;
  
    await newUser.save();
  
    res.json(newUser);
  }
  else {
    res.status(500);
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

exports.updateSubscribePhone = async (req, res) => {
  const user = await User.findOne({
    'info.user': req.body.user
  });

  await user.domain.map(async (domain) => {
    if (domain.name === req.body.domain) {
      domain.phoneSubscribe = true;
      return;
    }
  });
  await user.save();

  res.json(user);
};
