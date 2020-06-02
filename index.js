/**
 * @requires express
 * @requires express-session
 * @requires userRouter
 * @requires body-parser
 * @requires dotenv
 * @requires mongoose
 */

/**
 * Used port.
 */
const port = 3001;

/**
 * UserRouter module
 */
const userRouter = require('./routes/userRouter');

/**
 * Express module
 * @const
 * @source https://expressjs.com/en/api.html
 */
const express = require('express');
const app = express();

/**
 * Express-session module
 * @const
 * @source https://github.com/expressjs/session
 */
const session = require('express-session');

/**
 * Dotenv module
 * @source https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * Body-parser module
 * @const
 * @source https://github.com/expressjs/body-parser
 */
const bodyParser = require('body-parser');

/**
 * Mongoose module
 * @const
 * @source https://github.com/Automattic/mongoose
 */
const mongoose = require('mongoose');


/**
 * Set view engine and include static folder.
 */
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


/**
 * Set express-session along with it's secret.
 */
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    }),
);

/**
 * Set body-parser middleware.
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/**
 * Set mongoose along with it's preferd settings.
 */
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DB_URL);

/**
 * Set router
 */
app.use('/', userRouter);

/**
 * Listen to port
 */
app.listen(port);
