const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const express = require('express');
const http = require('http');
const path = require('path');
const port = process.env.PORT || 3000

// Middleware
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: false
}));

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Routes
app.get('/', function(request, response) {
  response.render('index', {})
});

app.get('/signup', function(request, response) {
  response.render('', {})
});

app.get('/login', function(request, response) {
  response.render('', {})
});

//Port

app.listen(port, function() {
  console.log(`Listening on http://localhost:${port}...`);
});
