const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

router.get('/express', (req, res) => {
  const query = req.query.query;
  res.render('indexView', {query: query});
});


router.post('/login', (req, res) => {
  const query = req.body;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, salt);

  console.log(query);
  User.findOne(
      {
        email: email,
        password: password,
      },
      (err, user) => {
        if (err) {
          console.log(err);
          return res.status(500).send();
        }
        if (!user) {
          return res.status(404).send();
        }

        console.log(user);
        req.session.user = user;
        return res.render('profile', {query: user});
      },
  );
});

router.get('/profile', (req, res) => {
  if (!req.session.user) {
    return res.render('indexView');
  }

  return res.render('profile', {query: user});
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  return res.render('homepage');
});

router.post('/register', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, salt);
  const pref = req.body.pref;
  // Mind that bodyparser indexes the name attribute of a HTML element.


  const newUser = new User();
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.email = email;
  newUser.password = password;
  newUser.pref = pref;
  newUser.save((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    return res.status(200).send();
  });
});

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/register/2', (req, res) => {
  // console.log(req.body)
  req.session.register = req.body;

  console.log(req.session.register);
  // res.render('register2')
});

module.exports = router;
