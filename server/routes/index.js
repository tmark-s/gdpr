const router = require('express').Router();
const api = require('./api');

router.use('/api', api);


// for call center
router.get('/', (req, res) => res.sendfile('./views/th/call-centre-2.1.html'));
router.get('/unsubscribe', (req, res) => res.sendfile('./views/th/call-centre-2.2.html'));
router.get('/snooze', (req, res) => res.sendfile('./views/th/call-centre-2.3.html'));
router.get('/update-complete', (req, res) => res.sendfile('./views/th/call-centre-3.3.html'));
router.get('/subscribe-sms', (req, res) => res.sendfile('./views/th/call-centre-3.1.html'));
router.get('/subscribe-email', (req, res) => res.sendfile('./views/th/call-centre-3.2.html'));



//for user
router.post('/update-subscribe', (req, res) => res.send(req.body))

module.exports = router;
