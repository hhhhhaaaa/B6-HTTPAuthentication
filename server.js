const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const cheerio = require('cheerio');
const database = require('./database.js');
const express = require('express');
const http = require('http');
const logger = require('morgan');
const path = require('path');
const port = process.env.PORT || 3000;
const pug = require('pug');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static('public'));
app.use(logger('dev'));

//View Engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Routes
app.get('/', function(request, response) {
  const email = request.cookies.email;
  response.render('index', {
    email: email
  });
});

app.route('/signup')
  .get(function(request, response) {
    var check = function() {
      if (document.getElementById('password').value ==
        document.getElementById('confirm_password').value) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'matching';
      } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'not matching';
      }
    }
    response.render('signup', {
      check: check
    });
  })
  .post(function(request, response) {
    const email = request.body.signupEmail;
    response.cookie('email', email, {
      httpOnly: true
    });
    response.redirect('/');
  });

app.get('/login', function(request, response) {
  response.render('login', {});
});

//Port

app.listen(port, function() {
  console.log(`Listening on http://localhost:${port}...`);
});

// So we're gonna want to setup a query. Which is going to require a table. Which is going to make necessary that we have the database completely setup.
// Then what we need to do right now is to focus on submitting the data into the database.
