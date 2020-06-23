# 👋 Welcome to Nerdr.match()!
_A dating platform designed and made to help programmers meet other programmers by their preferences and experience level._

![](https://i.ibb.co/n0GNPNZ/Screenshot-2020-06-19-at-16-40-05.png)

<table style="margin-left: auto; margin-right: auto;">
    <tr>
        <td align="center"><a href="#-features">🚀 Features<a></td>
        <td align="center"><a href="#-topics">✍ Topics<a></td>
        <td align="center"><a href="#-installation">📝 Installation<a></td>
        <td align="center"><a href="#-contributors">🤝 Contributors<a></td>
        <td align="center"><a href="#-dependencies">🤖 Dependencies<a></td>
        <td align="center"><a href="#-license">📝 License<a></td>
    </tr>
</table>

## 🚀 Features
Nerdr.match() is designed with programmers in mind so apart from its nerdy design it has has the following features:
* Registration and login system - Users can make a custom profile using their personal information and preferences
* Profile page - Programmers are fast learners so in this page we made it easy to update their skills.
* Discover - Here is where the magic happens; on this page you can find and match with other programmers.
* Filter: Interested in another language? In the filter page it's possible to filter out the matches.

## ✍ Topics
* [Helmet](https://github.com/sjagoori/dating-app/wiki/Topic:-Using-Helmet) - written by Sjors
* [External APIs](https://github.com/sjagoori/dating-app/wiki/Topic:-External-API) - written by Shabier
* [Password Hashing](https://github.com/sjagoori/dating-app/wiki/Topic:-Password-hashing) - Written by Shabier
* [Handle exceptions properly](https://github.com/sjagoori/dating-app/wiki/Handle-exceptions-properly) - written by Sjoerd


## 📝 Installation
The installation process is straight forward:

0. Install the latest NodeJS if you haven't already

[Download](https://nodejs.org/en/download/)

1. Clone the repo
```bash
git clone https://github.com/sjagoori/dating-app.git
```

2. Navigate to the repo and install the dependencies
```bash
cd dating-app && npm install
```

3. Fill your information in the `.env` file- you can use the example file as template
```env
DB_URL={DB_URL}
SESSION_SECRET={SESSION_SECRET}
```
4. Run the project 
```bash
npm run start
```

## 🤝 Contributors
Nerdr.match() is based on [project-tech](https://github.com/sjagoori/project-tech) by [sjagoori](github.com/sjagoori)

**Contributors**
* [Sjagoori](github.com/sjagoori)
* [Sjors Wijsman](github.com/SjorsWijsman)
* [Sjoerd Reen](https://github.com/sreen020)

## 🤖 Dependencies
To make Nerdr.match() work, the following packages are used:
* [BCrypt.js](https://github.com/kelektiv/node.bcrypt.js) - for securing passwords.
* [Body-parser](https://github.com/expressjs/body-parser) - to fish out data from forms.
* [Dotenv](https://github.com/motdotla/dotenv) - to 
securely store credentials.
* [Express.js](https://expressjs.com/en/api.html) - used for its fantastic middleware and routing.
* [Express-session](https://github.com/expressjs/session) - used for storing and keeping user sessions.
* [Mongoose](https://github.com/Automattic/mongoose) - ODM for MongoDB, to make life easier.
* [MongoDB](https://github.com/mongodb/node-mongodb-native) - as database.
* [NodeJS](https://nodejs.org/en/) - for backend I/O.

## 📝 License
[MIT](https://choosealicense.com/licenses/mit/)
