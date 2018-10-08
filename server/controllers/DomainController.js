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
  try {
    const newDomain = new Domain(req.body);
    await newDomain.save();
    res.json(newDomain);
  }
  catch (error) {
    res.status(500).json(error);
  }
};

