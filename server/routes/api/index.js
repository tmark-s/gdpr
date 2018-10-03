const router = require('express').Router();
const category = require('./category');
const user = require('./user')

router.use('/category', category);

router.use('/user', user);

module.exports = router;
