// jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
let buzzWords = [];
let userScore = 0;

// app.get('/', function(req, res) {
//   res.sendFile(__dirname + "/public/index.html");
// });

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/buzzwords', function(req, res) {
  res.json({"buzzWord": buzzWords});
});

app.post('/buzzword', function(req, res) {
    buzzWords.push(req.body);
    res.json({"success": true});
});

app.put('/buzzword', function(req, res) {
  for(let i = 0; i < buzzWords.length; i++) {
    if(req.body.buzzWord === buzzWords[i].buzzWord) {
      let points = parseInt(buzzWords[i].points);
      let newScore = userScore + points;
      buzzWords[i].heard = true;
      res.json({"success": true, "newScore": newScore});    
    }
  }
});

app.delete('/buzzword', function(req, res) {
  for(let i = 0; i < buzzWords.length; i++) {
    if(req.body.buzzWord === buzzWords[i].buzzWord) {
      let index = buzzWords.indexOf(buzzWords[i]);
      buzzWords.splice(index, 1);
      res.json({"success": true});
    }
  }
});

app.post('/reset', function(req, res) {
  for(let i = buzzWords.length; i > 0; i--) {
    buzzWords.pop();
    userScore = 0;
    res.json({"success": true});
  }
});

const server = app.listen(PORT, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});