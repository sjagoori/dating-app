const port = 3001;
const express = require('express');
const app = express();
const indexRouter = require('./routes/indexRouter');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// app.use('/express', indexRouter);
app.use('/', indexRouter);

app.listen(port);