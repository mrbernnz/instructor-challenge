var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var path = require('path');

app.use(express.static(path.join(__dirname, '/public')));
// bodyParse wasn't defined.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Missing a closing parens.
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/favorites', function(req, res) {
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});
// Missing closing bracket and paren for app.get method.

// incorrect http verb
app.post('/favorites', function(req, res) {
  // Missing a closing bracket for conditional statement.
  if (!req.body.name || !req.body.oid) {
    res.send('Error');
    return;
  }

  var data = JSON.parse(fs.readFileSync('./data.json'));
  data.push(req.body);
  fs.writeFile('./data.json', JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

// Syntax error. list !== listen.
app.listen(3000, function() {
  console.log('Listening on port 3000');
});
