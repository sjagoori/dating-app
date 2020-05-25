const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userScheme = new Schema({
  firstName: String,
  lastName: String,
  email: {type: String, unique: true},
  password: String,
  pref: String,
});

const User = mongoose.model('users', userScheme);

module.exports = User;

/*
show dbs //how dbs
use admin //select db
show collections //show collections
db.users.find().pretty() //print collection -> db.collection.find().pretty(). DB = used db (context)
*/
