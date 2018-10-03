const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const serveIndex = require('serve-index');
const routes = require('./routes');
const db = require('./db');
// const mongoose = require('mongoose');

const app = express();

db.init();
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(routes);

// mongoose.connect('mongodb://admin:password@db:27017/test')
//   .then(
//     () => console.log("Connect to database successful"),
//     err => console.log(err)
//   );

// const Employee = mongoose.model('Employee', { name: String })

// app.get('/', (req, res) => res.send('Hello'));

// app.get('/employee', async (req, res) => {
//   try {
//     const result = await Employee.find().exec();
//     res.json(result);
//   }
//   catch(error) {
//     res.json(error);
//   }
// });

app.listen(3000, () => console.log('App is listening on port 3000'));
