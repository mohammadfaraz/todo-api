var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('underscore');
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
 
    var matchedToDO = _.findWhere(todos, { id: parseInt(req.params.id)});
    //console.log(matchedToDO);
    if(matchedToDO) {
            res.json(matchedToDO);
    } else {
             res.status(404).send();
            //console.log('in else');
    }
    
});

app.post('/todos', function(req, res) {
   var body = _.pick(req.body, 'description', 'isCompleted');
    
    console.log(body)
    
    if(!_.isBoolean(body.isCompleted) || !_.isString(body.description) || body.description.trim().length === 0) {
        return res.status(400).send();
    }
    
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