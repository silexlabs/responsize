// node modules
var unifile = require('unifile');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var multipart = require('connect-multiparty');

// init express
var app = express();

// gzip/deflate outgoing responses
var compression = require('compression')
app.use(compression())

// parse data for file upload
app.use('/', multipart({limit: '100mb'}));

// parse data for post and get requests
app.use('/', bodyParser.urlencoded({
  extended: true,
  limit: '10mb'
}));
app.use('/', bodyParser.json({limit: '10mb'}));
app.use('/', cookieParser());

// session management
app.use('/', session({
  secret: 'responsize default secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 1 week
}));

// ********************************
// production
// ********************************
var isDebug = false;
/**
 * catch all errors to prevent nodejs server crash
 */
function onCatchError(err) {
    console.log  ('---------------------');
    console.error('---------------------', 'Caught exception: ', err, '---------------------');
    console.log  ('---------------------');
}
// catch all errors and prevent nodejs to crash, production mode
// process.on('uncaughtException', onCatchError);

// config
var options = unifile.defaultConfig;

// change www root
options.www.ROOT = __dirname + '/dist/';

// add static folders
options.staticFolders.push(
    // silex main site
    {
        path: __dirname + '/dist'
    },
    // debug silex, for js source map
    {
        name: '/js/src',
        path: __dirname + '/src'
    }
);

// unifile server
app.use('/api', unifile.middleware(express, app, options));

// server 'loop'
var port = process.env.PORT || 6969; // 6805 is the date of sexual revolution started in paris france 8-)
app.listen(port, function() {
  console.log('Listening on ' + port);
});

