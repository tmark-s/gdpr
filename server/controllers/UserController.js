const User = require('../models/User');
const Domain = require('../models/Domain');
const hash = require('object-hash');
const moment = require('moment');

exports.subscribe = async (req, res) => {
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
    const findDomain = await findUser.domain.find((domain) => {
      if (domain.name === req.body.domain) {
        return domain;
      }
    });

    if (!findDomain) {
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

      findUser.domain.push(addDomain);
      await findUser.save();

      res.json(findUser);
    }
    else {
      res.status(500).json("You're already subscribe this domain");
    }
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

exports.updateSubscribeSms = async (req, res) => {
  const user = await User.findOne({
    'info.user': req.body.user
  });

  await user.domain.map(async (domain) => {
    if (domain.name === req.body.domain) {
      domain.smsSubscribe = req.body.smsSubscribeCategory;
      return;
    }
  });
  await user.save();

  res.json(user);
};

exports.updateSubscribeEmail = async (req, res) => {
  const user = await User.findOne({
    'info.user': req.body.user
  });

  await user.domain.map(async (domain) => {
    if (domain.name === req.body.domain) {
      domain.emailSubscribe = req.body.emailSubscribeCategory;
      return;
    }
  });
  await user.save();

  res.json(user);
};

exports.updateUnsubscribe = async (req, res) => {
  const user = await User.findOne({
    'info.user': req.body.user
  });

  await user.domain.map(async (domain) => {
    if (domain.name === req.body.domain) {
      domain.emailSubscribe = [];
      domain.smsSubscribe = [];
      domain.phoneSubscribe = false;
      domain.snooze.isSnooze = false;
      domain.snooze.startDate = "";
      domain.snooze.endDate = "";
      return;
    }
  });
  await user.save();

  res.json(user);
};

exports.updateSnooze = async (req, res) => {
  const user = await User.findOne({
    'info.user': req.body.user
  });

  await user.domain.map(async (domain) => {
    if (domain.name === req.body.domain) {
      const startDate = moment().format('DD/MM/YYYY');
      const endDate = moment(startDate).add('days', 90).format('DD/MM/YYYY');
      domain.snooze.isSnooze = true;
      domain.snooze.startDate = startDate;
      domain.snooze.endDate = endDate;
      return;
    }
  });
  await user.save();

  res.json(user);
};

exports.updateUnsnooze = async (req, res) => {
  const user = await User.findOne({
    'info.user': req.body.user
  });

  await user.domain.map(async (domain) => {
    if (domain.name === req.body.domain) {
      domain.snooze.isSnooze = false;
      domain.snooze.startDate = "";
      domain.snooze.endDate = "";
      return;
    }
  });
  await user.save();

  res.json(user);
};
