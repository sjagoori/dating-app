# Welcome to Project Tech's Dating App!
For Project Tech we were asked to develop a dating app. In this repo you'll find the dating app along with it's documentation in the repo's wiki. 

![](https://raw.githubusercontent.com/sjagoori/project-tech/master/images/icon.png)

## Table of contents
- [Job story](#job-story)
- [Feature](#feature)
- [Setup](#setup)
- [Troubleshooting](#troubleshooting)
- [Sources](#sources)

## Job story
_When I feel the need to make use of a dating app, I want to be able to create an account where I can provide information that describes and defines me along with my preferences, so I can be able to create a personalised profile._

## Feature
This repo will have a working login and registration system as well as a profile page where the user, once logged in, can update their preferences or delete their account.

## Setup
This project has a few dependendcies, make sure you have them installed: 
* node (includes npm out of the box)
```bash
node -v && npm -v
```
* nodemon, to start the project, monitor changes and restart the server
```bash
npm i nodemon && nodemon -v
```

* an .env file, you can use the example or enter the following in the project root
```bash
echo "DB_URL=<The url to your MongoDB>\nSESSION_SECRET=<Your session secret>" > .env
```

* project dependencies
```bash 
npm install
```

* at last, you can run the project with
```bash
npm run start
```

## Troubleshooting
Getting issues during install? Your installation is probably outdated. 
```
npm update && npm install -g n && n latest
```
[Source](https://stackoverflow.com/a/52616913)

Also dont forget to fill out the .env file and whitelist your IP on [Atlas](cloud.mongodb.com)

## Sources
The following sources are used:
* [BCrypt.js](https://github.com/kelektiv/node.bcrypt.js)
* [Be-course](https://github.com/cmda-bt/be-course-19-20/)
* [Body-parser](https://github.com/expressjs/body-parser)
* [Dotenv](https://github.com/motdotla/dotenv)
* [Express.js](https://expressjs.com/en/api.html)
* [Express-session](https://github.com/expressjs/session)
* [Mongoose](https://github.com/Automattic/mongoose)
* [MongoDB](https://github.com/mongodb/node-mongodb-native)
