const port = 3001;
const express = require('express');
const app = express();

const userRouter = require('./routes/userRouter');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.DB_URL);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    }),
);


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/', userRouter);

app.listen(port);
