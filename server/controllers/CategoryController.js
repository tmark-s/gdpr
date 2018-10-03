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

exports.create = async (req, res) => {
  try {
    const newCategory = new Category(req.body.category);
    await newCategory.save();
    res.json(newCategory);
  }
  catch (error) {
    res.status(500).json(error);
  }
}
