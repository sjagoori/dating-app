/**
 * @module User
 * @requires mongoose
 */


/**
 * Mongoose module
 * @const
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Function allows the creation of structs/models.
 * @name userScheme
 * @function
 * @returns {User}
 */
const userScheme = new Schema({
  firstName: String,
  lastName: String,
  email: {type: String, unique: true},
  password: String,
  pref: String,
});

const User = mongoose.model('users', userScheme);

module.exports = User;
