const Domain = require('../models/Domain');

exports.find = async (req, res) => {
  try {
    const domain = await Domain.findOne({
      domainName: req.query.domain
    });
    res.json(domain);
  }
  catch (error) {
    res.status(500).json(error);
  }
};

exports.create = async (req, res) => {
  const findDomain = await Domain.findOne({
    name: req.body.domain
  });

  if (!findDomain) {
    const newDomain = new Domain();
    newDomain.name = req.body.domain;
    newDomain.emailSubscribe = {
      canSubscribe: false,
      category: []
    };
    newDomain.smsSubscribe = {
      canSubscribe: false,
      category: []
    };
    newDomain.phoneSubscribe = {
      canSubscribe: false
    };
    await newDomain.save();
    res.json(newDomain);
  }
  else {
    res.status(500).json("Domain already exist");
  }
};

