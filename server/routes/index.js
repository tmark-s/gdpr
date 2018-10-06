const router = require('express').Router();
const api = require('./api');
const CategoryController = require('../controllers/CategoryController');
router.use('/api', api);
const md = require('../models/Category')

// for call center
/*
router.get('/', (req, res) => res.sendfile('./views/th/call-centre-2.1.html'));
router.get('/unsubscribe', (req, res) => res.sendfile('./views/th/call-centre-2.2.html'));
router.get('/snooze', (req, res) => res.sendfile('./views/th/call-centre-2.3.html'));
router.get('/update-complete', (req, res) => res.sendfile('./views/th/call-centre-3.3.html'));
router.get('/subscribe-sms', (req, res) => res.sendfile('./views/th/call-centre-3.1.html'));
router.get('/subscribe-email', (req, res) => res.sendfile('./views/th/call-centre-3.2.html'));

*/

router.get('/', (req, res) => {
    MobileNo = true;
    Email = true;

    res.render('channel',
        {
            headText: "อัพเดทช่องทางรับข่าวสารจากบริษัทแสนสิริที่ท่านต้องการ",
            hasMobileNo: MobileNo,
            hasEmail: Email,
            hasOne: MobileNo || Email,
        });

});

router.get('/subscribe-sms', (req, res) => {
    md.find({}, function (err, doc) {
        if (err) {
            res.json(err)
        } else {
            //console.log("function:", doc)
            res.render('subscribe-sms', {
                headText: "เลือกอัพเดทข้อมูลข่าวสารจากช่องทางที่ท่านต้องการ",
                mobileNo: "089-129-4754",
                categories: doc,
            })
        }
    })
});


router.get('/subscribe-email', (req, res) => {

    md.find({}, function (err, doc) {
        if (err) {
            res.json(err)
        } else {
            //console.log("function:", doc)
            res.render('subscribe-email', {
                headText: "เลือกอัพเดทข้อมูลข่าวสารจากช่องทางที่ท่านต้องการ",
                email: "igiko.ay@gmail.com",
                categories: doc,
            })
        }
    })
});

router.get('/updated-complete', (req, res) => {
    res.render('updated-complete',
        {
            headText: "ขอบคุณสำหรับการอัพเดทข้อมูลของท่าน"
        })
});

//for user
router.post('/update-subscribe', (req, res) => res.send(req.body))

module.exports = router;
