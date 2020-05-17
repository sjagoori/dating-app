const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

router.get('/express', (req, res) => {
  const query = req.query.query
  res.render('indexView', { query: query });
});


router.post('/login', (req, res) => {
  let query = req.body
  let email = req.body.email
  let password = req.body.password
  console.log(query)
  User.findOne(
    {
      email: email,
      password: password
    },
    (err, user) => {
      if (err) {
        console.log(err)
        return res.status(500).send()
      }
      if (!user) {
        return res.status(404).send();
      }

      console.log(user)
      req.session.user = user;
      return res.render('profile', { query: user });
    }
  )
})

router.get('/profile', (req, res) => {

  if (!req.session.user) {
    return res.render('indexView');
  }

  return res.render('profile', { query: user });
})

router.get('/logout', (req, res) => {
  req.session.destroy();
  return res.render('homepage');
})

router.post('/register', (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;
  let pref = req.body.pref;
  // Mind that bodyparser indexes the name attribute of a HTML element.


  let newUser = new User();
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.email = email;
  newUser.password = password;
  newUser.pref = pref;
  newUser.save(err => {
    if (err) {
      console.log(err)
      return res.status(500).send();
    }
    return res.status(200).send();
  })
});

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/register', (req, res) => {
  res.render('register');
});

module.exports = router;