var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var todos = [{
    id: 1,
    description: 'Meet mom for lunch',
    isCompleted: 'false'
    },
    {
    id: 2,
    description: 'Go to market',
    isCompleted: 'false'
    },
    {
    id: 3,
    description: 'Get Shaved',
    isCompleted: 'true'
    }];
app.get('/', function(req, res) {
   res.send('TODO API Root');
});
app.get('/todos', function(req, res) {
   res.json(todos);
});
app.get('/todos/:id', function(req, res) {
 
    if(req.params.id-1 < todos.length) {
            res.json(todos[req.params.id-1]);
    } else {
             res.send('Something is wrong');
    }
});

app.listen(port, function() {
    console.log('Server Started'); 
});