/** Express router providing user related routes
 * @module router/userRouter
 * @requires express
 * @requires User
 * @requires bcrypt
 */

/**
 * Express module
 * @const
 */
const express = require('express');
const router = express.Router();

/**
 * User module
 * @const
 */
const User = require('../models/user.js');

/**
 * Bcrypt module
 * @const
 */
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
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
 * Login function, redirects to profile on success.
 * @name post/profile
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
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
 */
router.post('/update', (req, res) => {
  const targetGender = req.body.targetGender;
  const newPassword = req.body.npassword;
  const minAge = req.body.minAge;
  const maxAge = req.body.maxAge;

  if (!req.session.user) {
    return res.redirect('/');
  }

  const buildBlock = {preferences: {}};

  if (newPassword != '') {
    buildBlock.password = bcrypt.hashSync(newPassword, salt);
  }

  if (targetGender != undefined) {
    buildBlock.preferences.targetGender = targetGender;
  }

  if (minAge != '' && maxAge != '') {
    buildBlock.preferences.minAge = minAge;
    buildBlock.preferences.maxAge = maxAge;
  };

  if (Object.keys(buildBlock.preferences).length == 0) {
    delete buildBlock.preferences;
  }

  console.log(buildBlock);

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
 * Function logs user out; destorys session.
 * @name get/logout
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 *
 */
router.get('/logout', (req, res) => {
  req.session.destroy();
  return res.render('homepage');
});

router.get('/deleteme', (req, res) =>{
  User.findOneAndRemove({email: req.session.user.email}, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    req.session.destroy();
    return res.redirect('/');
  });
});

/**
 * Function redirects user to @see {@link get/profile}.
 * @name get/homepage
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 *
 */
router.get('/', (req, res) => {
  if (req.session.user) {
    return res.render('profile', {query: req.session.user});
  }
  return res.render('homepage');
});

router.get('/register', (req, res) => {
  return res.render('register');
});

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
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 *
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
      // console.log(req.session.register);
      res.render('register3');
      break;
    case '4':
      req.session.register.preferences = JSON.parse(JSON.stringify(req.body));
      console.log(req.session.register);

      const firstName = req.session.register.fname;
      const lastName = req.session.register.lname;
      const email = req.session.register.email;
      const password = bcrypt.hashSync(req.session.register.password, salt);
      const age = req.session.register.personal.age;
      const gender = req.session.register.personal.gender;
      const targetGender = req.session.register.preferences.targetGender;
      const minAge = req.session.register.preferences.minAge;
      const maxAge = req.session.register.preferences.maxAge;

      const newUser = new User();
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.email = email;
      newUser.password = password;
      newUser.personal = {
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
          return res.status(500).send('user already exists');
        }
        console.log(user);
        req.session.user = user;
        res.redirect('/');
      });
      break;
    default:
      res.status(500).send();
      break;
  }
});

/**
 * Function redirects unmatched routes to @see {@link get/homepage}.
 * @name *
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 *
 */
router.get('*', (req, res) => {
  return res.redirect('/');
});


module.exports = router;
