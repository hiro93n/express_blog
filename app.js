var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var csrf = require('csurf');

// putとdeleteを対応させる
var methodOverride = require('method-override');

// var routes = require('./routes/index');
// var users = require('./routes/users');
var posts = require('./routes/posts');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer());
app.use(cookieParser());

// app.use(methodOverride());

// v2.0.0以降は_methodを読むための下記の対処が必要
// https://github.com/expressjs/method-override custom logic参照のこと
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use(express.static(path.join(__dirname, 'public')));

// csrf対策。CokkieやSessionの設定が終わった後
// express-csrfは非推奨なのでもう使わない。csurfを使う
// app.use(csrf());

// routing
//app.use('/', routes);
//app.use('/users', users);
//app.use('/', posts);

// どのmethodでどのurlが呼び出されたらどのルーティングに行くのか

app.get('/', posts);
// ここでid二正規表現をつけても、結局見に行くのはpostsなのでposts側で処理しないとダメ
app.get('/posts/:id', posts);
app.get('/posts/new', posts);
app.post('/posts/create', posts);

// csrf
//app.get('/posts/:id/edit', function(req, res) {
//  res.render('send', { csrfToken: req.csrfToken() })
//});

app.get('/posts/:id/edit', posts);
app.delete('/posts/:id', posts);
app.put('/posts/:id', posts);

app.get('/new', function(req, res){
    res.render('new');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
