const router = require('express').Router();
const domain = require('./domain');
const user = require('./user');
const file = require('./file');

router.use('/domain', domain);

router.use('/user', user);

router.use('/file', file);

module.exports = router;
