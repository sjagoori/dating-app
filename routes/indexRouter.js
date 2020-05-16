const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

router.get('/express', (req, res) => {
  const query = req.query.query
  res.render('indexView', { query: query });
});


router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  User.findOne(
    {
      email: email,
      password: password
    },
    (err, user) => {
      err ? res.status(500) : (!user ? res.status(404).send() : res.status(200).send())
    }
  )
})

router.post('/register', (req, res) => {
  const query = req.body
  const email = req.body.email
  const password = req.body.password

  let newUser = new User();
  newUser.password = password;
  newUser.email = email;
  newUser.save(function (err, savedUser) {
    err ? res.status(500).send() : (savedUser ? res.status(406).send() : res.status(200).send())
  })
});

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/register', (req, res) => {
  res.render('register');
});

module.exports = router;