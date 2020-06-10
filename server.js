const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express ();
const db = mongoose.connection;
require('dotenv').config();
const PORT = process.env.PORT || 3003;
const mongodbURI = process.env.mongodbURI

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))

mongoose.connect(
  mongodbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongodbURI));
db.on('disconnected', () => console.log('mongo disconnected'));

const activitiesController = require('./controllers/activities_controller.js')
app.use('/activities', activitiesController)

const usersController = require('./controllers/users_controller.js')
app.use('/users', usersController)

const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)

app.get('/' , (req, res) => {
  res.send('Hello World!');
});

app.get('/account', (req, res) => {
  res.render('./community/account.ejs')
})

app.listen(PORT, () => console.log( 'Listening on port:', PORT));
