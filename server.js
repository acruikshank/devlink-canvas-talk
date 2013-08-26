var connect = require('connect');

var app = connect()
  .use(connect.logger('dev'))
  .use(connect.static('public'))
 .listen(8082);
console.log("Listening on port 8082")
