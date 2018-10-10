const router = require('express').Router();
const moment = require('moment');
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

router.put('/update-subscribe-phone', async (req, res) => {
  const user = await User.findOne({
    'info.link': req.body.link
  });

  await user.domain.map(async (domain) => {
    if (domain.domainName === req.body.domain) {
      domain.channel.phoneSubscribe = req.body.phoneSubscribe;
      return;
    }
  });
  await user.save();

  res.json(user);
});

router.get('/subscribe-sms', async (req, res) => {
  //// get user from database
  const user = await User.findOne({
    'info.link': req.query.link
  });

  //// get domain from database
  const domain = await Domain.findOne({
    domainName: req.query.domain
  });

  const userDetail = await user.domain.find((domain) => {
    return domain.domainName = req.query.domain
  });

  ////  prepared data categoryList
  const categories = domain.channel.smsSubscribe.categoryName;
  const userCategory = userDetail.channel.smsSubscribe.smsSubscribeCategory;
  const selectedCategory = []

  categories.map(category => {
    if (userCategory.indexOf(category) !== -1) {
      selectedCategory.push({ categoryName: category, categoryValue: category, Selected: true })
    } else {
      selectedCategory.push({ categoryName: category, categoryValue: category, Selected: false })
    }
  });

  // render page

  res.render('subscribe-sms', {
    headText: "อัพเดทช่องทางรับข่าวสารจากบริษัทแสนสิริที่ท่านต้องการ",
    mobileNo: user.info.phone,
    allCategory: selectedCategory,
    ownCategory: userDetail.channel.smsSubscribe.smsSubscribeCategory,
    snooze: userDetail.channel.smsSubscribe.snooze
  });
});

router.put('/update-subscribe-sms', async (req, res) => {
  const user = await User.findOne({
    'info.link': req.body.link
  });

  await user.domain.map(async (domain) => {
    if (domain.domainName === req.body.domain) {
      domain.channel.smsSubscribe.smsSubscribeCategory = req.body.smsSubscribeCategory;
      return;
    }
  });
  await user.save();

  res.json(user);
});

router.get('/subscribe-email', async (req, res) => {
  debugger
  const user = await User.findOne({
    'info.link': req.query.link
  });

  const domain = await Domain.findOne({
    domainName: req.query.domain
  });

  const userDetail = user.domain.find((domain) => {
    return domain.domainName = req.query.domain
  });

  const categories = domain.channel.emailSubscribe.categoryName;
  const userCategory = userDetail.channel.emailSubscribe.emailSubscribeCategory;
  const selectedCategory = []

  await categories.map(category => {
    if (userCategory.indexOf(category) !== -1) {
      selectedCategory.push({ categoryName: category, categoryValue: category, Selected: true })
    } else {
      selectedCategory.push({ categoryName: category, categoryValue: category, Selected: false })
    }
  });

  res.render('subscribe-email', {
    headText: "อัพเดทช่องทางรับข่าวสารจากบริษัทแสนสิริที่ท่านต้องการ",
    email: user.info.email,
    allCategory: selectedCategory,
    ownCategory: userDetail.channel.emailSubscribe.emailSubscribeCategory,
    snooze: userDetail.channel.emailSubscribe.snooze
  });
});

router.put('/update-subscribe-email', async (req, res) => {
  const user = await User.findOne({
    'info.link': req.body.link
  });

  await user.domain.map(async (domain) => {
    if (domain.domainName === req.body.domain) {
      domain.channel.emailSubscribe.emailSubscribeCategory = req.body.emailSubscribeCategory;
      return;
    }
  });
  await user.save();

  res.json(user);
});

router.get('/updated-complete', async (req, res) => {
  const user = await User.findOne({
    'info.link': req.query.link
  });

  const userDetail = await user.domain.find((domain) => {
    return domain.domainName = req.query.domain
  });

  const smsSubscribeList = userDetail.channel.smsSubscribe.smsSubscribeCategory
  let hasSmsSubscribe = false
  if (smsSubscribeList.length > 0) {
    hasSmsSubscribe = true;
  } else {
    hasSmsSubscribe = false;
  }

  const emailSubscribeList = userDetail.channel.smsSubscribe.smsSubscribeCategory
  let hasEmailSubscribe = false
  if (emailSubscribeList.length > 0) {
    hasEmailSubscribe = true;
  } else {
    hasEmailSubscribe = false;
  }


  res.render('updated-complete', {
    headText: "ขอบคุณสำหรับการอัพเดทข้อมูลของท่าน",
    hasSmsSubscribeCategory: hasSmsSubscribe,
    smsSubscribeCategory: userDetail.channel.smsSubscribe.smsSubscribeCategory,
    hasEmailSubscribe: hasEmailSubscribe,
    emailSubscribeCategory: userDetail.channel.emailSubscribe.emailSubscribeCategory,
    snooze: userDetail.channel.emailSubscribe.snooze
  });
});

router.put('/update-unsubscribe', async (req, res) => {
   const user = await User.findOne({
     'info.link': req.body.link
   });

  await user.domain.map(async (domain) => {
    if (domain.domainName === req.body.domain) {
      domain.channel.emailSubscribe.emailSubscribeCategory = [];
      domain.channel.smsSubscribe.smsSubscribeCategory = [];
      domain.channel.emailSubscribe.snooze.isSnooze = false;
      domain.channel.emailSubscribe.snooze.startDate = "";
      domain.channel.emailSubscribe.snooze.endDate = "";
      return;
    }
  });
  await user.save();

  res.json(user);
});

router.get('/unsubscribe-complete', async (req, res) => {
  res.render('unsubscribe-complete');
});

router.put('/update-snooze', async (req, res) => {
  const user = await User.findOne({
    'info.link': req.body.link
  });
  
  await user.domain.map(async (domain) => {
    if (domain.domainName === req.body.domain) {
      const startDate = moment().format('DD/MM/YYYY');
      const endDate = moment(startDate).add('days', 90).format('DD/MM/YYYY');
      domain.channel.emailSubscribe.snooze.isSnooze = true;
      domain.channel.emailSubscribe.snooze.startDate = startDate;
      domain.channel.emailSubscribe.snooze.endDate = endDate;
      // domain.channel.smsSubscribe.snooze.isSnooze = true;
      // domain.channel.phoneSubscribe.snooze.isSnooze = true;
      return;
    }
  });
  await user.save();

  res.json(user);
})

router.get('/snooze-complete', async (req, res) => {
  const user = await User.findOne({
    'info.link': req.query.link
  });

  const userDetail = await user.domain.find((domain) => {
    return domain.domainName = req.query.domain
  });

  res.render('snooze-complete', {
    headText: "ขอบคุณสำหรับการอัพเดทข้อมูลของท่าน",
    startDate: userDetail.channel.emailSubscribe.snooze.startDate,
    endDate: userDetail.channel.emailSubscribe.snooze.endDate
  });
});

router.put('/update-unsnooze', async (req, res) => {
  const user = await User.findOne({
    'info.link': req.body.link
  });

  await user.domain.map(async (domain) => {
    if (domain.domainName === req.body.domain) {
      domain.channel.emailSubscribe.snooze.isSnooze = false;
      domain.channel.emailSubscribe.snooze.startDate = "";
      domain.channel.emailSubscribe.snooze.endDate = "";
      return;
    }
  });
  await user.save();

  res.json(user);
});

module.exports = router;
