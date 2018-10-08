const router = require('express').Router();
const api = require('./api');
const Domain = require('../models/Domain');
const User = require('../models/User');

router.use('/api', api);

router.get('/', async (req, res) => {
    const domain = await Domain.findOne({
        domainName: req.query.domain
    });
    const user = await User.findOne({
        info: {
            link: req.query.link
        }
    });

    console.log(user);
    var hasPhone = false;
    if (user.info.phone != null || user.info.phone != undefined) {
        hasPhone = true
        console.log("hasPhone: ", hasPhone)
    } else {
        console.log("hasPhone: ", hasPhone)
        hasPhone = false
    }
    /*
        var hasEmail = false;
        if (user.info.email != null || user.info.email != undefined) {
            hasEmail = true;
        } else {
            hasEmail = false;
        }
    
        res.render('channel', {
            headText: "อัพเดทช่องทางรับข่าวสารจากบริษัทแสนสิริที่ท่านต้องการ",
            hasEmailSubscribe: domain.channel.emailSubscribe,
            hasSmsSubscribe: domain.channel.smsSubscribe,
            hasPhoneSubscribe: domain.channel.phoneSubscribe,
            hasPhone: hasPhone,
            hasEmail: hasEmail,
            hasOne: hasEmail || hasPhone
        });
        */
});

module.exports = router;
