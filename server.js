const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cheerio = require('cheerio');
const database = require('./database.js');
const express = require('express');
const http = require('http');
const path = require('path');
const port = process.env.PORT || 3000;

// Middleware
const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'));

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Routes
app.get('/', function(request, response) {
  const email = cookieSession.email;
  console.log(email);
  response.render('index', {
    email: email
  });
});

app.post('/signup', function(request, response) {
  const email = request.body.signupEmail;
  app.use(cookieSession({
    name: 'email',
    keys: [email],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }));
  response.redirect('/');
});

app.get('/signup', function(request, response) {
  response.render('signup', {});
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
