const router = require('express').Router();
const api = require('./api');

router.use('/api', api);

router.get('/', (req, res) => res.sendfile('./views/th/call-centre-2.1.html'));

module.exports = router;
