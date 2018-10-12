const router = require('express').Router();
const UserController = require('../../controllers/UserController');

router.get('/', UserController.find);

router.post('/', UserController.create);

router.put('/update-subscribe-phone', UserController.updateSubscribePhone);

module.exports = router;