const router = require('express').Router();
const DomainController = require('../../controllers/DomainController');

router.get('/', DomainController.find);

router.post('/', DomainController.create);

module.exports = router;
