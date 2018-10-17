const router = require('express').Router();
const DomainController = require('../../controllers/DomainController');

router.get('/', DomainController.find);

router.post('/', DomainController.create);

router.put('/update-name', DomainController.updateName);

router.put('/add-email-category', DomainController.addEmailCategory);

router.put('/add-sms-category', DomainController.addSmsCategory);

router.put('/edit-subscribe', DomainController.editSubscribe);

router.delete('/', DomainController.delete);

module.exports = router;
