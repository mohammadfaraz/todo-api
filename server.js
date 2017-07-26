var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
   res.send('TODO API Root');
    res.send(req);
});


app.listen(port, function() {
    console.log('Server Started'); 
});