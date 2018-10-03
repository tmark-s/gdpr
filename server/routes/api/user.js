const router = require('express').Router();
const UserController = require('../../controllers/UserController');

router.get('/', UserController.find);

router.post('/', UserController.create);

module.exports = router;