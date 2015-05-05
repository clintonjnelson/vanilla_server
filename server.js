//// 1. Error: Cannot find module './server.js'
'use strict';


var http = require('http');
var url = require('url');
var port = 3000;
var namestring;
var startOfName;
var firstPartUrl;
var date;
var postData;
var server = http.createServer(function(req, res) {
  startOfName = url.parse(req.url, true).pathname.lastIndexOf('/') + 1;
  firstPartUrl = '/' + req.url.split('/')[1];


  //// 11. Uncaught AssertionError: expected { Object (domain, _events, ...) } to have status code 200 but got 404
  if (req.url === '/time') {
    date = new Date();
    //// 12. Uncaught AssertionError: expected undefined to deeply equal ''
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify( {msg: date.toISOString() } ));
    res.end();

    //// 6. Uncaught AssertionError: expected { Object (domain, _events, ...) } to have status code 200 but got 404
  } else if (url.parse(req.url, true).pathname === '/greet/name' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    //// 7. Uncaught AssertionError: expected 'hello' to deeply equal 'hello, test.'
    res.write(JSON.stringify( {msg: ('hello, ' + url.parse(req.url, true).query.name) } ));
    res.end();

  } else if (firstPartUrl === '/greet' && req.method === 'GET') {
    // console.log('SHOULD NOT GET HERE');
    namestring = url.parse(req.url, true).pathname.substring(startOfName);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify( {msg: ('hello, ' + namestring) } ));
    res.end();

    //// 8. Uncaught AssertionError: expected { Object (domain, _events, ...) } to have status code 200 but got 404
  } else if ( (url.parse(req.url, true).pathname === '/greet') && (req.method === 'POST') ) {

    //// 9. Uncaught AssertionError: expected undefined to deeply equal 'hello, test.'
    req.on('data', function(data) {
      var body = JSON.parse(data.toString('utf-8'));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify( {msg: 'hello, ' + body.name } ));
      console.log("THIS IS THE DATA SENDING BACK: ", JSON.parse(data.toString()).name);
      //// 13. Uncaught AssertionError: expected undefined to deeply equal 'hello, test.'
      res.end();
    });

  } else {
    console.log('SHOULD NOT GET HERE');
    //// 4. Uncaught AssertionError: expected { Object (domain, _events, ...) } to have status code 404 but got 200
    res.writeHead(404, { 'Content-Type': 'application/json' });
    //// 5. Uncaught AssertionError: expected { msg: 'could not find page' } to deeply equal 'could not be found'
    res.write(JSON.stringify( {msg: 'could not find page'} ));
    res.end();
  }

  //// 3. Error: timeout of 2000ms exceeded. Ensure the done() callback is being called in this test.
  // res.end();
});


//// 2. [Error: connect ECONNREFUSED]
server.listen(port, function(){
  console.log('server listening on port ' + port + ' ...');
});










