/**
 * Express router providing user related routes
 * @module router/userRouter
 * @requires express
 * @requires User
 * @requires bcrypt
 * @requires axios
 */

/**
 * Express module
 * @const
 * @source https://expressjs.com/en/api.html
 */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

/**
 * Axios module
 * @const
 * @source https://github.com/axios/axios
 */
const axios = require('axios');

/**
 * Helmet module
 * @const
 * @source https://www.npmjs.com/package/helmet
 */
const helmet = require('helmet');
router.use(helmet());

/**
 * User module
 * @const
 */
const User = require('../models/User.js');

/**
 * Bcrypt module
 * @const
 * @source https://github.com/kelektiv/node.bcrypt.js
 */
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

/**
 * CommandList containing all available CLI commands
 */
const commands = require('../public/commandList.js');
const commandList = commands.getCommandList();
const commandPrototypeList = [];
for (command of Object.entries(commandList)) {
  let commandPrototype = command[0];
  for (argument of command[1]['arguments']) {
    commandPrototype += ` {${argument.label}}`;
  }
  commandPrototypeList.push(commandPrototype);
}

/**
 * Dummy content for discover page
 */
const dummy = require('../public/dummyContent.js');
const dummyContent = dummy.getDummyContent();

/**
 * Test env. Keep in project.
 * @name get/express
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/express', (req, res) => {
  const query = req.query.query;
  return res.render('indexView', {query: query, data: data});
});

/**
 * Function renders profile from session data,
 * redirects to homepage if not logged in.
 * @name get/profile
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/profile', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  return res.render('profile', {query: req.session.user});
});

/**
 * Function renders discover page,
 * redirects to homepage if not logged in.
 * @name get/discover
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/discover', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  return res.render('discover', {query: req.session.user, message: {}, commands: commandPrototypeList, dummy: dummyContent});
});

/**
 * Function renders preferences page,
 * redirects to homepage if not logged in.
 * @name get/discover
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/preferences', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  console.log(req.session.user.preferences.languages);
  return res.render('preferences', {query: req.session.user});
});

/**
 * Function receives input command and checks against commandList. Runs command
 * if it exists in commandList and command is entered correctly.
 * @name post/discover
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/discover', (req, res) => {
  const commandList = commands.getCommandList();
  const input = req.body.command.split(' ');
  const command = input.slice(0, 1)[0];
  const args = input.slice(1);
  let error;

  if (input.includes('php')) {
    res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  } else if (command in commandList) {
    // If command exists, check for correct amount of arguments given
    const chosenCommand = commandList[command];
    if (args.length === chosenCommand.arguments.length) {
      // If arguments amount are correct, check for correct argument values
      for ([i, argument] of args.entries()) {
        let valueList = chosenCommand.arguments[i].values;
        // If argument is dependent of previous argument value,
        // get index of value of dependant to choose which value list to check
        if (chosenCommand.arguments[i].dependant) {
          valueList = valueList[chosenCommand.arguments[i-1].values.indexOf(args[i-1])];
        }
        if (!valueList.includes(argument)) {
          error = `Positional argument [${i + 1}] contains invalid value "${argument}". Valid values: ${valueList}`;
          res.render('discover', {query: req.session.user, message: {type: 'error', message: error}, commands: commandPrototypeList, dummy: dummyContent});
        }
      };
      // If argument values are correct, run command function.
      const success = chosenCommand.success(args);
      if (command !== 'cd') {
        res.render('discover', {query: req.session.user, message: {type: 'success', message: success}, commands: commandPrototypeList, dummy: dummyContent});
      }
      chosenCommand.function(req, res, args);
    } else {
      error = `Command: "${command}" takes ${chosenCommand.arguments.length} arguments. Received: ${args.length}`;
      res.render('discover', {query: req.session.user, message: {type: 'error', message: error}, commands: commandPrototypeList, dummy: dummyContent});
    }
  } else {
    error = `Command: "${command}" has not been found or does not exist`;
    res.render('discover', {query: req.session.user, message: {type: 'error', message: error}, commands: commandPrototypeList, dummy: dummyContent});
  }
});

/**
 * Login function, redirects to profile on success.
 * @name post/profile
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 * @source https://mongoosejs.com/docs/api/model.html
 * @source https://expressjs.com/en/api.html#res.redirect
 * @source https://github.com/kelektiv/node.bcrypt.js#to-check-a-password
 */
router.post('/profile', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne(
      {
        email: email,
      },
      (err, user) => {
        if (err) {
          return res.status(500).send('couldn\'t connect to the database');
        }

        if (!user) {
          return res.render('homepage', {query: {
            errorMessage: 'Email or password is incorrect'}});
        }

        if (bcrypt.compareSync(password, user.password, salt)) {
          req.session.user = user;
          return res.redirect('/');
        } else {
          return res.render('homepage', {query: {
            errorMessage: 'Email or password is incorrect'}});
        }
      },
  );
});

/**
 * Update function, redirects to profile on success.
 * @name post/update
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 * @source https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndUpdate
 * @source https://expressjs.com/en/api.html#res.redirect
 * @source https://github.com/kelektiv/node.bcrypt.js#to-hash-a-password
 */
router.post('/update', function(req, res) {
  const languages = req.body.languages;
  const newPassword = req.body.npassword;
  const skillLevel = req.body.skillLevel;
  const occupation = req.body.occupation;

  const prefSkill = req.body.skillLevel;
  const prefOccupation = req.body.prefOccupation;
  const prefLanguages = req.body.prefLanguages;

  if (!req.session.user) {
    return res.redirect('/');
  }

  const buildBlock = {
    personal: {skillLevel: req.session.user.personal.skillLevel},
    preferences: req.session.user.preferences,
  };

  // if (newPassword != '') {
  //   buildBlock.password = bcrypt.hashSync(newPassword, salt);
  // }

  if (languages != undefined) {
    buildBlock.personal.languages = languages;
  } else {
    buildBlock.personal.languages = req.session.user.personal.languages;
  }

  if (skillLevel != undefined) {
    buildBlock.personal.skillLevel = skillLevel;
  } else {
    buildBlock.personal.skillLevel = req.session.user.personal.skillLevel;
  }

  if (occupation != undefined) {
    buildBlock.personal.occupation = occupation;
  } else {
    buildBlock.personal.occupation = req.session.user.personal.occupation;
  }


  // preferences
  if (prefSkill != undefined) {
    buildBlock.preferences.skillLevel = prefSkill;
  } else {
    buildBlock.preferences.skillLevel = req.session.user.preferences.skillLevel;
  }

  if (prefOccupation != undefined) {
    buildBlock.preferences.occupation = prefOccupation;
  } else {
    buildBlock.preferences.occupation = req.session.user.preferences.occupation;
  }

  if (prefLanguages != undefined) {
    buildBlock.preferences.languages = prefLanguages;
  } else {
    buildBlock.preferences.languages = req.session.user.preferences.languages;
  }


  if (Object.keys(buildBlock.personal).length == 0) {
    delete buildBlock.personal;
  }

  User.findOneAndUpdate({email: req.session.user.email},
      {$set: buildBlock},
      {new: true},
      (err, user) => {
        if (err) {
          return res.status(500).send('couldn\'t connect to the database');
        }
        req.session.user = user;
        return res.redirect('/');
      });
});

/**
 * Function logs user out; destroys session.
 * @name get/logout
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 * @source https://github.com/expressjs/session#sessiondestroycallback
 */
router.get('/logout', (req, res) => {
  req.session.destroy();
  return res.render('homepage');
});

/**
 * Function deletes user-data and logs user out.
 * @name get/deletme
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 * @source https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndRemove
 * @source https://github.com/expressjs/session#sessiondestroycallback
 */
router.get('/deleteme', (req, res) =>{
  User.findOneAndRemove({email: req.session.user.email}, (err) => {
    if (err) {
      return res.status(500).send('couldn\'t connect to the database');
    }
    req.session.destroy();
    return res.redirect('/');
  });
});

/**
 * Function renders register page.
 * @name get/register
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/register/:step', (req, res) => {
  const step = req.params.step;

  switch (step) {
    case '1':
      return res.render('register');
    case '2':
      return res.render('register2', {query: req.session.register});
    case '3':
      return res.render('register3', {query: req.session.register});
    default:
      return res.status(404).send();
  };
});

/**
 * Function registers user.
 * @name post/register
 * @function
 * @param {string} path - Express param path
 * @param {callback} middleware - Express middleware
 * @source https://mongoosejs.com/docs/api/model.html#model_Model.findOne
 * @source https://mongoosejs.com/docs/api/model.html#model_Model-save
 * @source https://expressjs.com/en/api.html#res.redirect
 */
router.post('/register/:step', (req, res)=>{
  const step = req.params.step;

  switch (step) {
    case '2':
      delete req.body.rpassword;
      req.session.register = JSON.parse(JSON.stringify(req.body));
      User.findOne({email: req.session.register.email}, (err, user)=>{
        if (!user) {
          res.render('register2', {query: req.session.register});
        } else {
          res.render('register', {query: {
            errorMessage: 'Email already in use',
          }});
        }
      });
      break;
    case '3':
      req.session.register.personal = JSON.parse(JSON.stringify(req.body));
      console.log('body stap 3', req.session.register);
      res.render('register3');
      break;
    case '4':
      req.session.register.preferences = JSON.parse(JSON.stringify(req.body));

      const firstName = req.session.register.fname;
      const lastName = req.session.register.lname;
      const email = req.session.register.email;
      const password = bcrypt.hashSync(req.session.register.password, salt);
      const skillLevel = req.session.register.personal.skillLevel;
      const occupation = req.session.register.personal.occupation;
      const languages = req.session.register.personal.languages;
      const tskillLevel = req.session.register.preferences.skillLevel;
      const toccupation = req.session.register.preferences.occupation;
      const tlanguages = req.session.register.preferences.languages;

      const newUser = new User();
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.email = email;
      newUser.password = password;
      newUser.personal = {
        skillLevel: skillLevel,
        occupation: occupation,
        languages: languages,
      };
      newUser.preferences = {
        skillLevel: tskillLevel,
        occupation: toccupation,
        languages: tlanguages,
      };

      newUser.save((err, user) =>{
        if (err) {
          return res.status(500).send('couldn\'t connect to the database');
        }
        req.session.user = user;
        res.redirect('/');
      });
      break;
    default:
      res.status(500).send('couldn\'t connect to the database');
      break;
  }
});

/**
 * Function redirects user to @see {@link get/profile}.
 * @name get/homepage
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/', async (req, res) => {
  if (req.session.user) {
    await axios.get('http://quotes.stormconsultancy.co.uk/random.json').then((response) => {
      req.session.user.quote = response.data.quote;
      req.session.user.author = response.data.author;
      req.session.user.permalink = response.data.permalink;
    }).catch( (error) => {
      console.log(error);
      req.session.user.quote = 'There is no right or wrong- but PHP is always wrong';
      req.session.user.author = 'Dev team';
      req.session.user.permalink = 'https://github.com/sjagoori/dating-app';
    });
    return res.render('profile', {query: req.session.user});
  }
  return res.render('homepage');
});

/**
 * Function renders profile from session data,
 * redirects to homepage if not logged in.
 * @name get/error
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/error', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  return res.render('error');
});

router.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  // next(error);
  return res.render('error', {message: error.message, errorCode: error.status});
});

router.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

/**
 * Function redirects unmatched routes to @see {@link get/homepage}.
 * @name *
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 * @source https://expressjs.com/en/api.html#res.redirect
 */
router.get('*', (req, res) => {
  return res.redirect('/');
});

module.exports = router;
