const port = 3001;
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const indexRouter = require('./routes/indexRouter');
const mangoose = require('mongoose')
const session = require('express-session');
require('dotenv').config();

mangoose.connect(process.env.DB_URL)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }))

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/', indexRouter);

app.listen(port);