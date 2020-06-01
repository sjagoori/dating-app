# Welcome to Project Tech's Dating App!
For Project Tech we were asked to develop a dating app. In this repo you'll find the dating app along with it's documentation in the repo's wiki. 

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

