var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var nextTodoID = 0;
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

var todos = [{
    id: nextTodoID++,
    description: 'Meet mom for lunch',
    isCompleted: 'false'
    },
    {
    id: nextTodoID++,
    description: 'Go to market',
    isCompleted: 'false'
    },
    {
    id: nextTodoID++,
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
 
    var matchedToDO;
    todos.forEach(function(todo){
        if(parseInt(req.params.id) === todo.id){
            matchedToDO = todo;
        }
    });
    //console.log(matchedToDO);
    if(matchedToDO) {
            res.json(matchedToDO);
    } else {
             res.status(404).send();
            //console.log('in else');
    }
    
});

app.post('/todos', function(req, res) {
   var body = req.body;
    console.log(body);
    if(typeof body !== 'undefined') {
    body.id = nextTodoID ++;
    todos.push(body);        
    }

    
    res.json(body);
});



app.listen(port, function() {
    console.log('Server Started'); 
});