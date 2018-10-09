const router = require('express').Router();
const api = require('./api');
const Domain = require('../models/Domain');
const User = require('../models/User');

router.use('/api', api);

async function getUserInfo(query) {
    return await User.findOne(query);

}

async function getDomainInfo(query) {
    return await Domain.findOne(query);
}

router.get('/', async (req, res) => {
    const domain = await getDomainInfo({ 'domainName': req.query.domain })
    const user = await getUserInfo({ 'info.link': req.query.link })

    var hasPhone = false;
    if (user.info.phone) {
        hasPhone = true
        console.log("hasPhone: ", hasPhone)
    } else {
        console.log("hasPhone: ", hasPhone)
        hasPhone = false
    }

    var hasEmail = false;
    if (user.info.email) {
        hasEmail = true;
    } else {
        hasEmail = false;
    }

    // data for render Selected Channel Page.
    res.render('channel', {
        headText: "อัพเดทช่องทางรับข่าวสารจากบริษัทแสนสิริที่ท่านต้องการ",
        hasEmailSubscribe: domain.channel.emailSubscribe,
        hasSmsSubscribe: domain.channel.smsSubscribe,
        hasPhoneSubscribe: domain.channel.phoneSubscribe,
        hasPhone: hasPhone,
        hasEmail: hasEmail,
        hasOne: hasEmail || hasPhone,
    });
});

router.get('/subscribe-sms', async (req, res) => {
    const domain = await getDomainInfo({ 'domainName': "sansiri" })
    const user = await getUserInfo({ 'info.link': "aa" })

    console.log("domain :", domain)

    res.render('subscribe-sms', {
        headText: "เลือกอัพเดทข้อมูลข่าวสารจากช่องทางที่ท่านต้องการ",
        mobileNo: "089-129-4754",
        categories: domain.category,
        selectedCategories: [],
    })
}

);


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
