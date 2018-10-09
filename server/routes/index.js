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
  const user = await User.findOne({ 
    'info.link': req.query.link
  });

  const domain = await Domain.findOne({
    domainName: req.query.domain
  });
  
  const userDetail = user.domain.find((domain) => {
    return domain.domainName = req.query.domain
  });

  res.render('subscribe-sms', {
    headText: "อัพเดทช่องทางรับข่าวสารจากบริษัทแสนสิริที่ท่านต้องการ",
    mobileNo: user.info.phone,
    allCategory: domain.channel.smsSubscribe.categoryName,
    ownCategory: userDetail.channel.smsSubscribe.smsSubscribeCategory,
    snooze: userDetail.channel.smsSubscribe.snooze
  });
});

router.get('/subscribe-email', async (req, res) => {
  const user = await User.findOne({ 
    'info.link': req.query.link
  });

  const domain = await Domain.findOne({
    domainName: req.query.domain
  });

  const userDetail = user.domain.find((domain) => {
    return domain.domainName = req.query.domain
  });

  res.render('subscribe-email', {
    headText: "อัพเดทช่องทางรับข่าวสารจากบริษัทแสนสิริที่ท่านต้องการ",
    email: user.info.email,
    allCategory: domain.channel.emailSubscribe.categoryName,
    ownCategory: userDetail.channel.emailSubscribe.emailSubscribeCategory,
    snooze: userDetail.channel.emailSubscribe.snooze
  });
});

// router.put('/update-subscribe-sms', async (req, res) => {
//   const user = await User.findOne({ 
//     'info.link': req.body.link,
//     'domain.domainName': req.body.domain
//   });
//   user.
// });

module.exports = router;
