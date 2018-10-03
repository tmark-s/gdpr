const Category = require('../models/Category');

exports.find = async (req, res) => {
  try {
    const categories = await Category.find().exec();
    res.json(categories);
  }
  catch (error) {
    res.status(500).json(error);
  }
};
