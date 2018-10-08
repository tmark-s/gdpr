const router = require('express').Router();
const domain = require('./domain');
const user = require('./user')

router.use('/domain', domain);

router.use('/user', user);

module.exports = router;
