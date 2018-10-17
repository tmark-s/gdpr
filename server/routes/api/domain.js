const router = require('express').Router();
const DomainController = require('../../controllers/DomainController');

router.get('/', DomainController.find);

router.post('/', DomainController.create);

router.put('/update-name', DomainController.updateName);

router.put('/edit-subscribe', DomainController.editSubscribe);

router.put('/add-category', DomainController.addCategory);

router.delete('/', DomainController.delete);

module.exports = router;
