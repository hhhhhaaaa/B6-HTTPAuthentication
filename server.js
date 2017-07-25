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
    response.render('signup', {

    });
  })
  .post(function( request, response ) {
    if ( request.body.signupPassword !== request.body.signupPasswordCheck ) {
      response.render( 'signup', { msg: "Passwords do not match." });
    } else {
      const email = request.body.signupEmail;
      const password = request.body.signupPassword;
      const cookie = request.cookies.cookieName;

      database.insertUsers(email, password)
        .then(result => {
          response.cookie( 'email', email, { httpOnly: true })
          response.redirect('/')
        })
        .catch
          ( error => response.status(500).render('error', { error: error }));
      }
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
