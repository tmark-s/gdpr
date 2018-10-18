const router = require('express').Router();
const api = require('./api');
const Domain = require('../models/Domain');
const User = require('../models/User');

router.use('/api', api);

router.get('/', async (req, res) => {
  const domain = await Domain.findOne({
    name: req.query.domain
  });

  const user = await User.findOne({
    'info.user': req.query.user
  });

  const userDetail = await user.domain.find((x) => {
    if (x.domainId.toString() === domain._id.toString()) {
      return x;
    }
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

router.get('/subscribe-sms', async (req, res) => {
  //// get user from database
  const user = await User.findOne({
    'info.user': req.query.user
  });

  //// get domain from database
  const domain = await Domain.findOne({
    name: req.query.domain
  });

  const userDetail = await user.domain.find((x) => {
    if (x.domainId.toString() === domain._id.toString()) {
      return x;
    }
  });

  //  prepared data categoryList
  const categories = domain.smsSubscribe.category;
  const userCategory = userDetail.smsSubscribe;
  const selectedCategory = []
  await categories.map(category => {
    if (category.canSubscribe) {
      if (userCategory.indexOf(category.value) !== -1) {
        selectedCategory.push({ categoryName: category.name, categoryValue: category.value, Selected: true })
      } else {
        selectedCategory.push({ categoryName: category.name, categoryValue: category.value, Selected: false })
      }
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

router.get('/subscribe-email', async (req, res) => {
  const user = await User.findOne({
    'info.user': req.query.user
  });

  const domain = await Domain.findOne({
    name: req.query.domain
  });

  const userDetail = await user.domain.find((x) => {
    if (x.domainId.toString() === domain._id.toString()) {
      return x;
    }
  });

  const categories = domain.emailSubscribe.category;
  const userCategory = userDetail.emailSubscribe;
  const selectedCategory = [];
  await categories.map(category => {
    if (category.canSubscribe) {
      if (userCategory.indexOf(category.value) != -1) {
        selectedCategory.push({ categoryName: category.name, categoryValue: category.value, Selected: true })
      } else {
        selectedCategory.push({ categoryName: category.name, categoryValue: category.value, Selected: false })
      }
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

router.get('/updated-complete', async (req, res) => {
  const user = await User.findOne({
    'info.user': req.query.user
  });

  const domain = await Domain.findOne({
    name: req.query.domain
  });

  const userDetail = await user.domain.find((x) => {
    if (x.domainId.toString() === domain._id.toString()) {
      return x;
    }
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

router.get('/unsubscribe-complete', async (req, res) => {
  res.render('unsubscribe-complete');
});

router.get('/snooze-complete', async (req, res) => {
  const user = await User.findOne({
    'info.user': req.query.user
  });

  const domain = await Domain.findOne({
    name: req.query.domain
  });

  const userDetail = await user.domain.find((x) => {
    if (x.domainId.toString() === domain._id.toString()) {
      return x;
    }
  });

  if (userDetail.snooze.isSnooze) {
    res.render('snooze-complete', {
      headText: "ขอบคุณสำหรับการอัพเดทข้อมูลของท่าน",
      startDate: userDetail.snooze.startDate,
      endDate: userDetail.snooze.endDate
    });
  }
  else {
    res.redirect('/?user=' + req.query.user + '&domain=' + req.query.domain);
  }
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
  const domain = await Domain.find({
  });
  res.render('Backoffice-cmn', { layout: 'staff_main.hbs', domainList: domain });
});


router.get('/cmn-create', async (req, res) => {
  const domain = await Domain.find({
  });
  res.render('CMN-Create', { layout: 'staff_main.hbs', domainName: domain });
});


router.get('/backoffice-umn', async (req, res) => {
  const user = await User.find({ 'domain.name': 'sansiri' });
  res.render('Backoffice-umn', {
    layout: 'staff_main.hbs',
    userList: user,
  });
});

router.get('/umn-filefilter', async (req, res) => {
  const domain = await Domain.find({
  });
  res.render('UMN-FileFilter', {
    layout: 'staff_main.hbs',
    domainList: domain
  });
});

router.get('/dmn-setting', async (req, res) => {
  const domainList = await Domain.find({});
  const domain = await Domain.findOne({ name: req.query.domain })
  res.render('DMN-Setting', {
    layout: 'staff_main.hbs',
    listDomain: domainList,
    headText: req.query.domain,
    dataDomain: domain
  });
})

module.exports = router;