const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/users.js')

const users = express.Router()

users.get('/signup', (req, res) => {
  res.render('./community/signup.ejs', {
    currentUser: req.session.currentUser
  })
})

users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err)
      res.send('oops there was an error creating a user')
    } else {
      console.log('user is created', createdUser)
      res.redirect('/activities')
    }
  })
})

module.exports = users
