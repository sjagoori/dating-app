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
          return res.status(404).send('email or password doesnt exist');
        }

        if (bcrypt.compareSync(password, user.password, salt)) {
          req.session.user = user;
          return res.redirect('/');
        } else {
          return res.status(404).send('email or password doesnt exist');
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
  const pref = req.body.prefs;

  User.findOneAndUpdate({email: req.session.user.email},
      {$set: {pref: pref}},
      {new: true},
      (err, user) => {
        if (err) {
          return res.status(500).send('couldn\'t connect to the database');
        }
        req.session.user = user;
        return res.render('profile', {query: user});
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

/**
 * Function registers user.
 * @name post/register
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 *
 */
router.post('/register', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, salt);
  const pref = req.body.pref;

  const newUser = new User();
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.email = email;
  newUser.password = password;
  newUser.pref = pref;
  newUser.save((err, user) => {
    if (err) {
      return res.status(500).send();
    }

    req.session.user = user;
    return res.redirect('/');
  });
});

router.get('/deleteme', (req, res) =>{
  User.findOneAndRemove({email: req.session.user.email}, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

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

/**
 * [WIP] - Function iterates through registration..
 * @name get/regiser/22
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 *
 */
router.post('/register/2', (req, res) => {
  // const email = req.body.email;
  // const password = bcrypt.hashSync(req.body.rpassword, salt);
  delete req.body.rpassword;
  req.session.register = req.body;

  console.log(req.session.register);
  res.render('register2', {query: req.session.register});
});


router.post('/register/final', (req, res)=>{
  req.session.register.preferences = req.body;
  console.log(req.session.register);
});

module.exports = router;
