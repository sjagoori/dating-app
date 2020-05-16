const port = 3001;
const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const indexRouter = require('./routes/indexRouter');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/', indexRouter);

app.listen(port);