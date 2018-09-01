const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const app = express();
const db = new sqlite3.Database('app.db');

const rootPath = 'dist';
const root = 'appPath';

const isEmpty = (x) => x == null || x.length == 0;

app.use(express.json());

function responseError(res, msg) {
    res.statusCode = 500;
    res.statusMessage = msg;
    return res.json();
}

app.post('/rsvp', function (req, res) {
  console.log(`POST (/rsvp)`);
  let body = req.body;
  if (isEmpty(body.guest) || isEmpty(body.response)) {
    return responseError(res, 'Please indicate your name and whether you can attend the celebration or not.')
  }
  db.run("INSERT INTO guests (Name, Response) VALUES ($guest, $response)", {
      $guest: body.guest,
      $response: body.response
  }, function onGuestInsert(e) {
    if (e) {
      return responseError(res, 'Something went wrong...my apologies! Try again or please send your RSVP to brbrowngeo@gmail.com instead.')
    }
    // The request created a new resource object
    res.statusCode = 201;
    // The result of CREATE should be the same as GET
    return res.json({id:this.lastID});
  });
});

app.set(root, rootPath);
app.use(express.static(path.join(__dirname, rootPath)))

app.use('/', function(req, res){
  res.sendFile(app.get(root), '/index.html');
});

app.listen(3010, () => console.log('Example app listening on port 3000!'));
