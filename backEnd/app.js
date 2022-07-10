var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var lrRouter = require('./routes/lr');
var billRouter = require('./routes/bill');
var vehicleRouter = require('./routes/vehicle');
var bankRouter = require('./routes/bank');
var driverRouter = require('./routes/driver');
var consignorRouter = require('./routes/consignor');

var app = express();
app.use(cors())
var expressMongoDb = require('express-mongo-db');
app.use(expressMongoDb('mongodb://localhost/transport'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/lr', lrRouter);
app.use('/bill', billRouter);
app.use('/vehicle', vehicleRouter);
app.use('/bank', bankRouter);
app.use('/driver', driverRouter);
app.use('/consignor', consignorRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
