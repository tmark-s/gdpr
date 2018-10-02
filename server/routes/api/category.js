const router = require('express').Router();
const CategoryController = require('../../controllers/CategoryController');

router.get('/', CategoryController.find);

module.exports = router;
