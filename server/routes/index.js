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
  const domain = await getDomainInfo({ 'name': req.query.domain })
  const user = await getUserInfo({ 'info.user': req.query.user})

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
    hasEmailSubscribe: domain.emailSubscribe.canSubscribe,
    hasSmsSubscribe: domain.smsSubscribe.canSubscribe,
    hasPhoneSubscribe: domain.phoneSubscribe.canSubscribe,
    hasPhone: hasPhone,
    hasEmail: hasEmail,
    hasOne: hasEmail || hasPhone
  });
});

router.put('/update-subscribe-phone', async (req, res) => {
  const user = await User.findOne({
    'info.user': req.body.user
  });

  await user.domain.map(async (domain) => {
    if (domain.name === req.body.domain) {
      domain.phoneSubscribe = req.body.phoneSubscribe;
      return;
    }
  });
  await user.save();

  res.json(user);
});

router.get('/subscribe-sms', async (req, res) => {
  //// get user from database
  const user = await User.findOne({
    'info.user': req.query.user
  });

  //// get domain from database
  const domain = await Domain.findOne({
    name: req.query.domain
  });

  const userDetail = await user.domain.find((domain) => {
    return domain.name = req.query.domain
  });

  //  prepared data categoryList
  const categories = domain.smsSubscribe.category;
  const userCategory = userDetail.smsSubscribe;
  const selectedCategory = []

  categories.map(category => {
    if (userCategory.indexOf(category) !== -1) {
      selectedCategory.push({ categoryName: category.name, categoryValue: category.value, Selected: true })
    } else {
      selectedCategory.push({ categoryName: category.name, categoryValue: category.value, Selected: false })
    }
  });

  // render page

  res.render('subscribe-sms', {
    headText: "อัพเดทช่องทางรับข่าวสารจากบริษัทแสนสิริที่ท่านต้องการ",
    mobileNo: user.info.phone,
    allCategory: selectedCategory
  });
});

router.put('/update-subscribe-sms', async (req, res) => {
  const user = await User.findOne({
    'info.user': req.body.user
  });

  await user.domain.map(async (domain) => {
    if (domain.name === req.body.domain) {
      domain.smsSubscribe = req.body.smsSubscribeCategory;
      return;
    }
  });
  await user.save();

  res.json(user);
});

router.get('/subscribe-email', async (req, res) => {
  const user = await User.findOne({
    'info.user': req.query.user
  });

  const domain = await Domain.findOne({
    name: req.query.domain
  });

  const userDetail = user.domain.find((domain) => {
    return domain.name = req.query.domain
  });

  const categories = domain.emailSubscribe.category;
  const userCategory = userDetail.emailSubscribe;
  const selectedCategory = [];

  await categories.map(category => {
    if (userCategory.indexOf(category) !== -1) {
      selectedCategory.push({ categoryName: category.name, categoryValue: category.value, Selected: true })
    } else {
      selectedCategory.push({ categoryName: category.name, categoryValue: category.value, Selected: false })
    }
  });

  res.render('subscribe-email', {
    headText: "อัพเดทช่องทางรับข่าวสารจากบริษัทแสนสิริที่ท่านต้องการ",
    email: user.info.email,
    allCategory: selectedCategory
  });
});

router.put('/update-subscribe-email', async (req, res) => {
  const user = await User.findOne({
    'info.user': req.body.user
  });

  await user.domain.map(async (domain) => {
    if (domain.name === req.body.domain) {
      domain.emailSubscribe = req.body.emailSubscribeCategory;
      return;
    }
  });
  await user.save();

  res.json(user);
});

router.get('/updated-complete', async (req, res) => {
  const user = await User.findOne({
    'info.user': req.query.user
  });

  const userDetail = await user.domain.find((domain) => {
    return domain.name = req.query.domain
  });

  const smsSubscribeList = userDetail.smsSubscribe;
  let hasSmsSubscribe = false;
  if (smsSubscribeList.length > 0) {
    hasSmsSubscribe = true;
  } else {
    hasSmsSubscribe = false;
  }

  const emailSubscribeList = userDetail.emailSubscribe;
  let hasEmailSubscribe = false;
  if (emailSubscribeList.length > 0) {
    hasEmailSubscribe = true;
  } else {
    hasEmailSubscribe = false;
  }

  res.render('updated-complete', {
    headText: "ขอบคุณสำหรับการอัพเดทข้อมูลของท่าน",
    hasSmsSubscribeCategory: hasSmsSubscribe,
    smsSubscribeCategory: userDetail.smsSubscribe,
    hasEmailSubscribe: hasEmailSubscribe,
    emailSubscribeCategory: userDetail.emailSubscribe
  });
});

router.put('/update-unsubscribe', async (req, res) => {
   const user = await User.findOne({
     'info.user': req.body.user
   });

  await user.domain.map(async (domain) => {
    if (domain.name === req.body.domain) {
      domain.emailSubscribe = [];
      domain.smsSubscribe = [];
      domain.phoneSubscribe = false;
      domain.snooze.isSnooze = false;
      domain.snooze.startDate = "";
      domain.snooze.endDate = "";
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
    'info.user': req.body.user
  });
  
  await user.domain.map(async (domain) => {
    if (domain.name === req.body.domain) {
      const startDate = moment().format('DD/MM/YYYY');
      const endDate = moment(startDate).add('days', 90).format('DD/MM/YYYY');
      domain.snooze.isSnooze = true;
      domain.snooze.startDate = startDate;
      domain.snooze.endDate = endDate;
      return;
    }
  });
  await user.save();

  res.json(user);
})

router.get('/snooze-complete', async (req, res) => {
  const user = await User.findOne({
    'info.user': req.query.user
  });

  const userDetail = await user.domain.find((domain) => {
    return domain.name = req.query.domain
  });

  res.render('snooze-complete', {
    headText: "ขอบคุณสำหรับการอัพเดทข้อมูลของท่าน",
    startDate: userDetail.snooze.startDate,
    endDate: userDetail.snooze.endDate
  });
});

router.put('/update-unsnooze', async (req, res) => {
  const user = await User.findOne({
    'info.user': req.body.user
  });

  await user.domain.map(async (domain) => {
    if (domain.name === req.body.domain) {
      domain.snooze.isSnooze = false;
      domain.snooze.startDate = "";
      domain.snooze.endDate = "";
      return;
    }
  });
  await user.save();

  res.json(user);
});

module.exports = router;
