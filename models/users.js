const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
  name: String,
  email: {type:String, unique:true, required:true},
  username: {type:String, unique:true, required:true},
  password: String
})

const User = mongoose.model('User', userSchema)

module.exports = User
