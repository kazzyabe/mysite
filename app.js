var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var infoRouter = require('./routes/info');
var posRouter = require('./routes/pos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/info', infoRouter);
app.use('/pos', posRouter)
// app.get('/pos', hellworld);

// function hellworld(req, res) {
//   var spawn = require('child_process').spawn;
//   py = spawn('python', ["./test.py"]);
//   // ls = spawn('ls')
//   var dataToSend = 'woooo';

//   py.stdout.on('data', function(data){
//     console.log("data =", data);
//     dataToSend = data.toString();
//   });
//   py.on('close', (code) => {
//     console.log(`child process close all stdio with code ${code}`);
//     // send data to browser
//     res.send(dataToSend)
//   });
//   // py.stdout.on('end', function(){
//   //     console.log('Sum of numbers=',dataString);
//   // });
//   // py.stdin.write(JSON.stringify(data));
//   // py.stdin.end();
//   // res.render('pos', { title: dataString });
// };

// app.use('/users', usersRouter);

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
