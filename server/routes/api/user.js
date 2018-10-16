const router = require('express').Router();
const UserController = require('../../controllers/UserController');

router.get('/', UserController.find);

router.post('/subscribe', UserController.subscribe);

router.put('/update-subscribe-phone', UserController.updateSubscribePhone);

router.put('/update-subscribe-sms', UserController.updateSubscribeSms);

router.put('/update-subscribe-email', UserController.updateSubscribeEmail);

router.put('/update-unsubscribe', UserController.updateUnsubscribe);

router.put('/update-snooze', UserController.updateSnooze);

router.put('/update-unsnooze', UserController.updateUnsnooze);

module.exports = router;