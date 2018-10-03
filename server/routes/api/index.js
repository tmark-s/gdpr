const router = require('express').Router();
const category = require('./category');

router.use('/category', category);

module.exports = router;
