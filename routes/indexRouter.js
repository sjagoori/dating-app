const express = require('express');
const router = express.Router();

router.get('/express', (req, res) => {
  const query = req.query.query
  res.render('indexView', { query: query });
});

router.get('/', (req, res) => {
  res.render('loginView');
});

module.exports = router;