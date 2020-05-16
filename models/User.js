var mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userScheme = new Schema({
  email: String,
  password: String
})

let User = mongoose.model('users', userScheme)

module.exports = User;
