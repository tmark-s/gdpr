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
  const domain = await getDomainInfo({ 'name': req.query.domain });

  const user = await getUserInfo({ 'info.user': req.query.user });

  const userDetail = await user.domain.find((domain) => {
    return domain.name = req.query.domain
  });

  let hasPhone = false;
  if (user.info.phone) {
    hasPhone = true
  } else {
    hasPhone = false
  }

  let hasEmail = false;
  if (user.info.email) {
    hasEmail = true;
  } else {
    hasEmail = false;
  }

  let page = 'channel';
  let modelData = {}
  if (userDetail.snooze.isSnooze) {
    page = 'snooze-complete'
    modelData = {
      headText: "ขอบคุณสำหรับการอัพเดทข้อมูลของท่าน",
      startDate: userDetail.snooze.startDate,
      endDate: userDetail.snooze.endDate
    }

  } else {
    page = 'channel';
    modelData = {
      headText: "อัพเดทช่องทางรับข่าวสารจากบริษัทแสนสิริที่ท่านต้องการ",
      hasEmailSubscribe: domain.emailSubscribe.canSubscribe,
      hasSmsSubscribe: domain.smsSubscribe.canSubscribe,
      hasPhoneSubscribe: domain.phoneSubscribe.canSubscribe,
      hasPhone: hasPhone,
      hasEmail: hasEmail,
      hasOne: hasEmail || hasPhone,
      snooze: userDetail.snooze

    }
  }

  // data for render Selected Channel Page.
  res.render(page, modelData);
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
  await categories.map(category => {
    if (userCategory.indexOf(category.value) !== -1) {
      selectedCategory.push({ categoryName: category.name, categoryValue: category.value, Selected: true })
    } else {
      selectedCategory.push({ categoryName: category.name, categoryValue: category.value, Selected: false })
    }
  });

  // render page

  let page = 'subscribe-sms';
  let modelData = {};
  if (userDetail.snooze.isSnooze) {
    page = 'snooze-complete'
    modelData = {
      headText: "ขอบคุณสำหรับการอัพเดทข้อมูลของท่าน",
      startDate: userDetail.snooze.startDate,
      endDate: userDetail.snooze.endDate
    }
  }
  else {
    page = 'subscribe-sms';
    modelData = {
      headText: "อัพเดทช่องทางรับข่าวสารจากบริษัทแสนสิริที่ท่านต้องการ",
      mobileNo: user.info.phone,
      allCategory: selectedCategory,
      snooze: userDetail.snooze
    }
  }
  res.render(page, modelData);
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
    if (userCategory.indexOf(category.value) != -1) {
      selectedCategory.push({ categoryName: category.name, categoryValue: category.value, Selected: true })
    } else {
      selectedCategory.push({ categoryName: category.name, categoryValue: category.value, Selected: false })
    }
  });

  let page = 'subscribe-email';
  let modelData = {}
  if (userDetail.snooze.isSnooze) {
    page = 'snooze-complete'
    modelData = {
      headText: "ขอบคุณสำหรับการอัพเดทข้อมูลของท่าน",
      startDate: userDetail.snooze.startDate,
      endDate: userDetail.snooze.endDate
    }
  } else {
    page = 'subscribe-email'
    modelData = {
      headText: "อัพเดทช่องทางรับข่าวสารจากบริษัทแสนสิริที่ท่านต้องการ",
      email: user.info.email,
      allCategory: selectedCategory,
      snooze: userDetail.snooze
    }
  }
  res.render(page, modelData);
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

  const domain = await Domain.findOne({
    name: req.query.domain
  });

  const userDetail = await user.domain.find((domain) => {
    return domain.name = req.query.domain
  });

  const smsSubscribeList = userDetail.smsSubscribe;
  const hasSmsSubscribe = smsSubscribeList.length > 0 ? true : false;
  const smsSubscribeName = [];

  for (let i = 0; i < smsSubscribeList.length; i += 1) {
    for (let j = 0; j < domain.smsSubscribe.category.length; j += 1) {
      if (domain.smsSubscribe.category[j].value === smsSubscribeList[i]) {
        smsSubscribeName.push(domain.smsSubscribe.category[j].name);
        break;
      }
    }
  }

  const emailSubscribeList = userDetail.emailSubscribe;
  const hasEmailSubscribe = emailSubscribeList.length > 0 ? true : false;
  const emailSubscribeName = [];

  for (let i = 0; i < emailSubscribeList.length; i += 1) {
    for (let j = 0; j < domain.emailSubscribe.category.length; j += 1) {
      if (domain.emailSubscribe.category[j].value === emailSubscribeList[i]) {
        emailSubscribeName.push(domain.emailSubscribe.category[j].name);
        break;
      }
    }
  }

  let page = 'updated-complete'
  let modelData = {}
  if (userDetail.snooze.isSnooze) {
    page = 'snooze-complete'
    modelData = {
      headText: "ขอบคุณสำหรับการอัพเดทข้อมูลของท่าน",
      startDate: userDetail.snooze.startDate,
      endDate: userDetail.snooze.endDate
    }
  } else {
    page = 'updated-complete';
    modelData = {
      headText: "ขอบคุณสำหรับการอัพเดทข้อมูลของท่าน",
      hasSmsSubscribeCategory: hasSmsSubscribe,
      smsSubscribeCategory: smsSubscribeName,
      hasEmailSubscribe: hasEmailSubscribe,
      emailSubscribeCategory: emailSubscribeName,
      snooze: userDetail.snooze
    }
  }
  res.render(page, modelData);
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

//// backoffice url
router.get('/backoffice', async (req, res) => {
  res.render('Backoffice-home', { layout: 'staff_main.hbs' });
});

router.get('/backoffice-dmn', async (req, res) => {
  const domainList = await Domain.find({});
  res.render('Backoffice-dmn', { layout: 'staff_main.hbs', dataDomain: domainList });
});

router.get('/backoffice-chmn', async (req, res) => {
  res.render('Backoffice-chmn', { layout: 'staff_main.hbs' });
});

router.get('/backoffice-cmn', async (req, res) => {
  res.render('Backoffice-cmn', { layout: 'staff_main.hbs' });
});

router.get('/backoffice-umn', async (req, res) => {
  const user = await User.find({ 'domain.name': 'sansiri' });
  console.log(user)
  res.render('Backoffice-umn', { layout: 'staff_main.hbs', userList: user });

});

module.exports = router;