✨ Welcome to the Project Tech Dating App repo

Start off by installing all dependencies
```
npm install 
```

Run the project
```
npm run start 
```

This project uses MangoDB, you can use their [installation guide](https://docs.mongodb.com/guides/server/install/) or, if you use homebrew, use
```
brew tap mongodb/brew && brew install mongodb-community@4.2  
```

Dont forget to start the database if it doesnt automatically
```
brew services start mongodb-community@4.2
```

Access the database by a 3rd party client, or by terminal:
```
mongod
```

If it returns an error, find it's PID `sudo lsof -iTCP -sTCP:LISTEN -n -P` and kill it `kill -9 PID`.

**setup up your .env file**
```env
DB_URL=mongodb+srv:{ip}
SESSION_SECRET={session_secret}
```
