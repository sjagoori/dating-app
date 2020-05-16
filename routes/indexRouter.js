const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

router.get('/express', (req, res) => {
  const query = req.query.query
  res.render('indexView', { query: query });
});

router.post('/login', (req, res) => {
  const query = req.body
  const email = req.body.email
  const password = req.body.password

  let newUser = new User();
  newUser.password = password;
  newUser.email = email;
  newUser.save(function (err, savedUser) {
    if (err) {
      console.log(err)
      return res.status(500).send();
    }
    return res.status(200).send();
  })

  console.log(query)
});

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/register', (req, res) => {
  res.render('register');
});

module.exports = router;