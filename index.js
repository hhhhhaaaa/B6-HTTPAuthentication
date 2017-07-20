const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cheerio = require('cheerio');
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
// app.use(cookieSession({
//   name: 'session',
//   keys: [ /* secret keys */ ],
//
//   // Cookie Options
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }));

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Routes
app.get('/', function(request, response) {
  response.render('index', {});
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
