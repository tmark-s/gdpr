const router = require('express').Router();
const api = require('./api');
const Domain = require('../models/Domain');
const User = require('../models/User');

router.use('/api', api);

router.get('/', async (req, res) => {
  const domain = await Domain.findOne({
    domainName: req.query.domain
  });
  console.log(domain);
  const user = await User.findOne({
    info: {
      link: req.query.link
    }
  });
  res.render('channel', {
    headText: "อัพเดทช่องทางรับข่าวสารจากบริษัทแสนสิริที่ท่านต้องการ",
    hasEmailSubscribe: domain.channel.emailSubscribe,
    hasSmsSubscribe: domain.channel.smsSubscribe,
    hasPhoneSubscribe: domain.channel.phoneSubscribe,
    phone: user.info.phone,
    email: user.info.email
  });
});

// router.post('/subscribe-sms', async (req, res) => {

// });

module.exports = router;
