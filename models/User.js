var mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userScheme = new Schema({
  email: String,
  password: String
})

let User = mongoose.model('users', userScheme)

module.exports = User;

/*
show dbs //how dbs
use admin //select db
show collections //show collections
db.users.find().pretty() //print collection -> db.collection.find().pretty(). DB = used db (context)
*/