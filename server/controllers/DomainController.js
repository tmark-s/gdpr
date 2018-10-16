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

exports.updateName = async (req, res) => {
  const domain = await Domain.findById(req.body.id);
  domain.name = req.body.name;
  await domain.save();
  res.json(domain);
};

exports.addEmailCategory = async (req, res) => {
  const domain = await Domain.findById(req.body.id);
  await domain.emailSubscribe.category.map((category) => {
    if (category.name === req.body.category.name) {
      res.status(500).json("This category already exist");
    }
  });

  const newCategory = {
    name: req.body.category.name,
    value: req.body.category.value
  }

  domain.emailSubscribe.category.push(newCategory);
  domain.save();
  res.json(domain);
};

exports.addSmsCategory = async (req, res) => {
  const domain = await Domain.findById(req.body.id);
  await domain.smsSubscribe.category.map((category) => {
    if (category.name === req.body.category.name) {
      res.status(500).json("This category already exist");
    }
  });

  const newCategory = {
    name: req.body.category.name,
    value: req.body.category.value
  }

  domain.smsSubscribe.category.push(newCategory);
  domain.save();
  res.json(domain);
};

exports.editSubscribe = async (req, res) => {
  const domain = await Domain.findById(req.body.id);
  domain.phoneSubscribe.canSubscribe = req.body.phoneSubscribe;
  domain.smsSubscribe.canSubscribe = req.body.smsSubscribe;
  domain.emailSubscribe.canSubscribe = req.body.emailSubscribe;
  await domain.save();
  res.json(domain);
};
