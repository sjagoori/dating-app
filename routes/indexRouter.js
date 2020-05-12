const express = require('express');
const router = express.Router();

router.get('/express', (req, res) => {
  const query = req.query.query
  res.render('indexView', { query: query });
});

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/register', (req, res) => {
  res.render('register');
});

module.exports = router;