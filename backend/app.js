var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // <-- ajout

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var internshipRouter = require('./routes/internship');

var app = express();

app.use(cors({
  origin: 'http://localhost:5173', // ton front-end Vite
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/internship', internshipRouter);

module.exports = app;
