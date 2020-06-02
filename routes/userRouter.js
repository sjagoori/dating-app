/**
 * Express router providing user related routes
 * @module router/userRouter
 * @requires express
 * @requires User
 * @requires bcrypt
 */

/**
 * Express module
 * @const
 * @source https://expressjs.com/en/api.html
 */
const express = require('express');
const router = express.Router();

/**
 * User module
 * @const
 */
const User = require('../models/User.js');

/**
 * Bcrypt module
 * @const
 * @source https://github.com/kelektiv/node.bcrypt.js
 */
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

/**
 * Data file strictly used for testing.
 */
const data = require('../data/data.json');

/**
 * Test env. Keep in project.
 * @name get/express
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/express', (req, res) => {
  const query = req.query.query;
  return res.render('indexView', {query: query, data: data});
});

/**
 * Function renders profile from session data,
 * redirects to homepage if not logged in.
 * @name get/profile
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/profile', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  return res.render('profile', {query: req.session.user});
});

/**
 * Login function, redirects to profile on success.
 * @name post/profile
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 * @source https://mongoosejs.com/docs/api/model.html
 * @source https://expressjs.com/en/api.html#res.redirect
 * @source https://github.com/kelektiv/node.bcrypt.js#to-check-a-password
 */
router.post('/profile', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne(
      {
        email: email,
      },
      (err, user) => {
        if (err) {
          return res.status(500).send('couldn\'t connect to the database');
        }

        if (!user) {
          return res.render('homepage', {query: {
            errorMessage: 'Email or password is incorrect'}});
        }

        if (bcrypt.compareSync(password, user.password, salt)) {
          req.session.user = user;
          return res.redirect('/');
        } else {
          return res.render('homepage', {query: {
            errorMessage: 'Email or password is incorrect'}});
        }
      },
  );
});

/**
 * Update function, redirects to profile on success.
 * @name post/update
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 * @source https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndUpdate
 * @source https://expressjs.com/en/api.html#res.redirect
 * @source https://github.com/kelektiv/node.bcrypt.js#to-hash-a-password
 */
router.post('/update', (req, res) => {
  const targetGender = req.body.targetGender;
  const newPassword = req.body.npassword;
  const minAge = req.body.minAge;
  const maxAge = req.body.maxAge;
  const buildBlock = {preferences: {}};

  if (!req.session.user) {
    return res.redirect('/');
  }

  if (newPassword != '') {
    buildBlock.password = bcrypt.hashSync(newPassword, salt);
  }

  if (targetGender != undefined) {
    buildBlock.preferences.targetGender = targetGender;
  } else {
    // eslint-disable-next-line max-len
    buildBlock.preferences.targetGender = req.session.user.preferences.targetGender;
  }

  if (minAge != '' && maxAge != '') {
    buildBlock.preferences.minAge = minAge;
    buildBlock.preferences.maxAge = maxAge;
  } else {
    buildBlock.preferences.minAge = req.session.user.preferences.minAge;
    buildBlock.preferences.maxAge = req.session.user.preferences.maxAge;
  }

  User.findOneAndUpdate({email: req.session.user.email},
      {$set: buildBlock},
      {new: true},
      (err, user) => {
        if (err) {
          return res.status(500).send('couldn\'t connect to the database');
        }
        req.session.user = user;
        return res.redirect('/');
      });
});

/**
 * Function logs user out; destorys session.
 * @name get/logout
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 * @source https://github.com/expressjs/session#sessiondestroycallback
 */
router.get('/logout', (req, res) => {
  req.session.destroy();
  return res.render('homepage');
});

/**
 * Function deletes user-data and logs user out.
 * @name get/deletme
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 * @source https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndRemove
 * @source https://github.com/expressjs/session#sessiondestroycallback
 */
router.get('/deleteme', (req, res) =>{
  User.findOneAndRemove({email: req.session.user.email}, (err) => {
    if (err) {
      return res.status(500).send('couldn\'t connect to the database');
    }
    req.session.destroy();
    return res.redirect('/');
  });
});

/**
 * Function renders register page.
 * @name get/register
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/register/:step', (req, res) => {
  const step = req.params.step;

  switch (step) {
    case '1':
      return res.render('register');
    case '2':
      return res.render('register2', {query: req.session.register});
    case '3':
      return res.render('register3', {query: req.session.register});
    default:
      return res.status(404).send();
  };
});

/**
 * Function registers user.
 * @name post/register
 * @function
 * @param {string} path - Express param path
 * @param {callback} middleware - Express middleware
 * @source https://mongoosejs.com/docs/api/model.html#model_Model.findOne
 * @source https://mongoosejs.com/docs/api/model.html#model_Model-save
 * @source https://expressjs.com/en/api.html#res.redirect
 */
router.post('/register/:step', (req, res)=>{
  const step = req.params.step;

  switch (step) {
    case '2':
      delete req.body.rpassword;
      req.session.register = JSON.parse(JSON.stringify(req.body));
      User.findOne({email: req.session.register.email}, (err, user)=>{
        if (!user) {
          res.render('register2', {query: req.session.register});
        } else {
          res.render('register', {query: {
            errorMessage: 'Email already in use',
          }});
        }
      });
      break;
    case '3':
      req.session.register.personal = JSON.parse(JSON.stringify(req.body));
      res.render('register3');
      break;
    case '4':
      req.session.register.preferences = JSON.parse(JSON.stringify(req.body));

      const firstName = req.session.register.fname;
      const lastName = req.session.register.lname;
      const email = req.session.register.email;
      const password = bcrypt.hashSync(req.session.register.password, salt);
      const age = req.session.register.personal.age;
      const gender = req.session.register.personal.gender;
      const latitude = req.session.register.personal.latitude;
      const longitude = req.session.register.personal.longitude;
      const targetGender = req.session.register.preferences.targetGender;
      const minAge = req.session.register.preferences.minAge;
      const maxAge = req.session.register.preferences.maxAge;

      const newUser = new User();
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.email = email;
      newUser.password = password;
      newUser.personal = {
        latitude: latitude,
        longitude: longitude,
        age: age,
        gender: gender,
      };
      newUser.preferences = {
        minAge: minAge,
        maxAge: maxAge,
        targetGender: targetGender,
      };
      newUser.save((err, user) =>{
        if (err) {
          return res.status(500).send('couldn\'t connect to the database');
        }
        req.session.user = user;
        res.redirect('/');
      });
      break;
    default:
      res.status(500).send('couldn\'t connect to the database');
      break;
  }
});

/**
 * Function redirects user to @see {@link get/profile}.
 * @name get/homepage
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/', (req, res) => {
  if (req.session.user) {
    return res.render('profile', {query: req.session.user});
  }
  return res.render('homepage');
});

/**
 * Function redirects unmatched routes to @see {@link get/homepage}.
 * @name *
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 * @source https://expressjs.com/en/api.html#res.redirect
 */
router.get('*', (req, res) => {
  return res.redirect('/');
});


module.exports = router;
