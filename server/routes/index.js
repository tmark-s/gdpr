const router = require('express').Router();
const api = require('./api');
const Domain = require('../models/Domain');
const User = require('../models/User');

router.use('/api', api);

router.get('/', async (req, res) => {
  const domain = await Domain.findOne({
    domainName: req.query.domain
  });

  const user = await User.findOne({ 'info.link': req.query.link });

  let hasPhone = false;
  if (user.info.phone != null || user.info.phone != undefined) {
    hasPhone = true
    console.log("hasPhone: ", hasPhone)
  } 
  else {
    console.log("hasPhone: ", hasPhone)
    hasPhone = false
  }

  let hasEmail = false;
  if (user.info.email != null || user.info.email != undefined) {
    hasEmail = true;
  } 
  else {
    hasEmail = false;
  }

  res.render('channel', {
    headText: "อัพเดทช่องทางรับข่าวสารจากบริษัทแสนสิริที่ท่านต้องการ",
    hasEmailSubscribe: domain.channel.emailSubscribe.canSubscribe,
    hasSmsSubscribe: domain.channel.smsSubscribe.canSubscribe,
    hasPhoneSubscribe: domain.channel.phoneSubscribe.canSubscribe,
    hasPhone: hasPhone,
    hasEmail: hasEmail,
    hasOne: hasEmail || hasPhone
  });
});

router.get('/subscribe-sms', async (req, res) => {
  const user = await User.findOne({ 
    'info.link': req.query.link,
    'domain.domainName': req.query.domain
  });

  const domain = await Domain.findOne({
    domainName: req.query.domain
  });
  
  res.render('subscribe-sms', {
    headText: "อัพเดทช่องทางรับข่าวสารจากบริษัทแสนสิริที่ท่านต้องการ",
    mobileNo: user.info.phone,
    allCategory: domain.channel.smsSubscribe.categoryName,
    ownCategory: user.domain[0].channel.smsSubscribeCategory
  });
});

module.exports = router;
