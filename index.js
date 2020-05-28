/**
 * @requires express
 * @requires express-session
 * @requires userRouter
 * @requires body-parser
 * @requires dotenv
 * @requires mongoose
 */

const port = 3001;

/**
 * UserRouter module
 */
const userRouter = require('./routes/userRouter');

/**
 * Express module
 * @const
 */
const express = require('express');
const app = express();

/**
 * Express-session module
 * @const
 */
const session = require('express-session');

/**
 * Dotenv module
 */
require('dotenv').config();

/**
 * Body-parser module
 * @const
 */
const bodyParser = require('body-parser');

/**
 * Mongoose module
 * @const
 */
const mongoose = require('mongoose');


// express
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


// express-session
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    }),
);

// userRouter
app.use('/', userRouter);

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DB_URL);

app.listen(port);
