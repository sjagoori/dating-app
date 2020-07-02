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
 * @source https://mongoosejs.com/docs/models.html
 */
const userScheme = new Schema({
  firstName: String,
  lastName: String,
  email: {type: String, unique: true},
  password: String,
  personal: {
    skillLevel: String,
    occupation: String,
    languages: [],
  },
  preferences: {
    skillLevel: String,
    occupation: String,
    languages: [],
  },
  matches: Array,
});

const User = mongoose.model('users', userScheme);

module.exports = User;
