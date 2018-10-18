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
    const newDomain = new Domain;
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

exports.addCategory = async (req, res) => {
  const domain = await Domain.findById(req.body.id);
  let isDuplicate = false;

  if (req.body.emailChannel) {
    await domain.emailSubscribe.category.map((category) => {
      if (category.name === req.body.category.name || category.value === req.body.category.value) {
        isDuplicate = true;
        return;
      }
    });

    const newCategory = {
      name: req.body.category.name,
      value: req.body.category.value,
      canSubscribe: true
    }

    domain.emailSubscribe.category.push(newCategory);
  }

  if (req.body.smsChannel) {
    await domain.smsSubscribe.category.map((category) => {
      if (category.name === req.body.category.name || category.value === req.body.category.value) {
        isDuplicate = true;
        return;
      }
    });

    const newCategory = {
      name: req.body.category.name,
      value: req.body.category.value,
      canSubscribe: true
    }

    domain.smsSubscribe.category.push(newCategory);
  }

  if (!isDuplicate) {
    domain.save();
    res.json(domain);
  }
  else {
    res.status(500).json("This category already exist");
  }
};

exports.editCategory = async (req, res) => {
  if (req.body.channel === 'email') {
    const domain = await Domain.findOne({
      'emailSubscribe.category._id': req.body.id
    });

    await domain.emailSubscribe.category.map((category) => {
      if (category._id.toString() === req.body.id.toString()) {
        category.name = req.body.name;
        return;
      }
    });

    domain.save();
    res.json(domain);
  }
  else if (req.body.channel === 'sms') {
    const domain = await Domain.findOne({
      'smsSubscribe.category._id': req.body.id
    });

    await domain.smsSubscribe.category.map((category) => {
      if (category._id.toString() === req.body.id.toString()) {
        category.name = req.body.name;
        return;
      }
    });

    domain.save();
    res.json(domain);
  }
};

exports.editSubscribe = async (req, res) => {
  const domain = await Domain.findById(req.body.id);
  domain.phoneSubscribe = req.body.phoneSubscribe;
  domain.smsSubscribe = req.body.smsSubscribe;
  domain.emailSubscribe = req.body.emailSubscribe;
  await domain.save();
  res.json(domain);
};

exports.delete = async (req, res) => {
  const domain = await Domain.findById(req.query.id);
  await Domain.deleteOne(domain);
  res.json('Delete domain complete');
};
