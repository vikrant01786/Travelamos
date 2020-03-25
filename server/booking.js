var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors=require('cors');
var multer = require('multer');


var indexRouter = require('./routes/index');
var authentication=require('./routes/admin/authentication');
var file =require('./routes/admin/file');
var admin =require('./routes/admin/admin');
var web = require('./routes/web/web');
var email = require('./routes/web/email')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({limit:'50mb'}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './uploads')));

app.use('/', indexRouter);
app.use('/authentication',authentication);
app.use('/file', file);
app.use('/admin', admin);
app.use('/web', web);
app.use('/email', email);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
