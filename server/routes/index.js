const router = require('express').Router();
const api = require('./api');
const Domain = require('../models/Domain');
const User = require('../models/User');

router.use('/api', api);

router.get('/', async (req, res) => {
  const domain = await Domain.findOne({
    domainName: req.query.domain
  });
  const user = await User.find({
    info: {
      link: req.query.link
    }
  });
  res.render('channel', {
    headText: "อัพเดทช่องทางรับข่าวสารจากบริษัทแสนสิริที่ท่านต้องการ",
    hasEmailSubscribe: domain.channel.emailSubscribe,
    hasSmsSubscribe: domain.channel.smsSubscribe,
    hasphoneSubscribe: domain.channel.phoneSubscribe,
    phone: user.info.phone,
    email: user.info.email
  });
});

module.exports = router;
