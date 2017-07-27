const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const database = require('./database.js');
const express = require('express');
const http = require('http');
const logger = require('morgan');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static('public'));
app.use(logger('dev'));
app.use(cookieSession({
  name: 'email',
  keys: ["savetheworld"],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

//View Engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//TODO Routes Change to Arrow Functions
app.get('/', (request, response) =>
  response.render('index', {email: request.cookies.email}));
//TODO make into function
app.route('/signup')
  .get(function(request, response) {
    const email = request.cookies.email;
    if (email) {
      response.redirect('/');
    } else {
      response.render('signup');
    }
  })
  .post(function(request, response) {
    if (request.body.signupPassword !== request.body.signupPasswordCheck) {
      response.render('signup', {
        //TODO change msg to message
        msg: "Passwords do not match."
      });
    } else {
      const emailSignup = request.body.signupEmail;
      const passwordSignup = request.body.signupPassword;
      const cookie = request.cookies.cookieName;

      database.insertUser(emailSignup, passwordSignup)
        .then(result => {
          response.cookie('email', emailSignup, {
            httpOnly: true
          });
          response.redirect('/');
        })
        .catch(error => response.status(500).render('error', { error: error }));
    }
  });

app.route('/login')
  .get(function(request, response) {
    const email = request.cookies.email;
    if (email) {
      response.redirect('/');
    } else {
      response.render('login', {});
    }
  })
  .post(function(request, response) {
    const emailLogin = request.body.loginEmail;
    const passwordLogin = request.body.loginPassword;
    const cookie = request.cookies.cookieName;

    if (emailLogin === "") {
      response.render('login', {
        msg: "Please provide an email or password to login."
      })
    } else {
      database.checkUser(emailLogin)
        .then(result => {
          if (result !== null) {
            if (result.password === passwordLogin) {
              response.cookie('email', emailLogin, {
                httpOnly: true
              })
              response.redirect('/');
            } else {
              response.render('login', {
                msg: "Incorrect email or password."
              });
            }
          } else {
            response.render('login', {
              msg: "Incorrect email or password."
            });
          }
        })
        .catch(error => response.status(500).render('error', { error: error }));
    }
  });

app.get('/logout', function(request, response) {
  request.session = null;
  response.redirect('/');
});


//Port

app.listen(port, function() {
  console.log(`Listening on http://localhost:${port}...`);
});
