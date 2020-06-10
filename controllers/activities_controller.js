const express = require('express')
const Activities = require('../models/activities.js')
const activities = express.Router()

const isAuthinticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/login')
  }
}

const sayHello = (req, res, next) => {
  console.log('hello from the middleware')
  next()
}

activities.get('/new', (req, res) => {
  res.render(
    './community/new.ejs',
    {currentUser: req.session.currentUser}
  )
})

activities.get('/edit/:id', isAuthinticated, (req, res) => {
  Activities.findById(req.params.id, (error, activitiesFound) => {
    res.render(
      './community/edit.ejs',
    {
      activities: activitiesFound,
      currentUser: req.session.currentUser
    })
  })
})

activities.delete('/:id', isAuthinticated, (req, res) => {
  Activities.findByIdAndRemove(req.params.id, (err, activitiesDeleted) => {
    res.redirect('/home')
  })
})

activities.get('/:id', isAuthinticated, sayHello, (req, res) => {
    Activities.findById(req.params.id, (error, activitiesFound) => {
      res.render(
        './community/show.ejs',
      {
        activities: activitiesFound,
        currentUser: req.session.currentUser
      })
    })
})

activities.put('/:id', (req, res) => {
  Activities.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedModel) => {
      res.redirect('/home')
    }
  )
})

activities.post('/', (req, res) => {
  Activities.create(req.body, (error, createdActivity) => {
    if (error) {
      console.log(error)
      res.send('oops there was an error creating an activity')
    } else {
      console.log('user is created', createdActivity)
      res.redirect('/activities')
    }
  })
})

activities.get('/', (req, res) => {
  Activities.find({}, (error, activitiesAll) => {
    res.render(
      './community/home.ejs',
    {
      activities: activitiesAll,
      currentUser: req.session.currentUser
    })
  })
})

module.exports = activities
