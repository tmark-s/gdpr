const mongoose = require('mongoose');

const User = mongoose.model('user', {
  info: {
    email: {
      type: String,
    },
    phone: {
      type: String
    },
    link: {
      type: String
    }
  },
  emailSubscribe: [
    {
      categoryName: {
        type: String,
        require: true
      },
      status: {
        type: String,
        require: true
      },
      startDate: {
        type: Date
      },
      endDate: {
        type: Date
      }
    }
  ],
  smsSubscribe: [
    {
      categoryName: {
        type: String,
        require: true
      },
      status: {
        type: String,
        require: true
      },
      startDate: {
        type: Date
      },
      endDate: {
        type: Date
      }
    }
  ],
  phoneSubscribe: {
    status: {
      type: String,
      require: true
    }
  }
});