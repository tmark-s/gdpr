const router = require('express').Router();
const CategoryController = require('../../controllers/CategoryController');

router.get('/', CategoryController.find);
router.get('/getlist', CategoryController.get);

router.post('/', CategoryController.create);

module.exports = router;
