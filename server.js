var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db.js');
var app = express();
var _ = require('underscore');
var nextTodoID = 0;
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

var todos = [{
    id: nextTodoID++,
    description: 'Meet mom for lunch',
    isCompleted: false
    },
    {
    id: nextTodoID++,
    description: 'Go to market',
    isCompleted: false
    },
    {
    id: nextTodoID++,
    description: 'Get Shaved',
    isCompleted: true
    }];



app.get('/', function(req, res) {
   res.send('TODO API Root');
});

app.get('/todos', function(req, res) {
    var queryParams = req.query;
    var where = {};
    //console.log(filteredToDos);
    if(queryParams.hasOwnProperty('isCompleted') && queryParams.isCompleted === 'true') {
        where.isCompleted = true;

    } else if(queryParams.hasOwnProperty('isCompleted') && queryParams.isCompleted === 'false') {
        where.isCompleted = false;
        
    }
    if(queryParams.hasOwnProperty('q') && _.isString(queryParams.q)) {
        where.description = {
            $like: '%' + queryParams.q + '%'
        } 
       } 
    
   db.todo.findAll({where: where}).then(function(foundTodos) {
       res.json(foundTodos);
   }, function(e) {
       res.status(500).json(e.message);
   });
});

app.get('/todos/:id', function(req, res) {
 
    var id = parseInt(req.params.id);
    
    db.todo.findById(id).then(function(foundTodo) {
       if(foundTodo) {
           res.json(foundTodo.toJSON());
       } else {
           res.status(400).json({"error": "RECORD NOT FOUND"});
       }
    }, function(e) {
        res.status(500).json(e.message);
    });
    
    /*var matchedToDO = _.findWhere(todos, { id: parseInt(req.params.id)});
    //console.log(matchedToDO);
    if(matchedToDO) {
            res.json(matchedToDO);
    } else {
             res.status(404).send();
            //console.log('in else');
    }*/
    
});

app.post('/todos', function(req, res) {
   var body = _.pick(req.body, 'description', 'isCompleted');
    
    console.log(body)
   /* if(!_.isBoolean(body.isCompleted) || !_.isString(body.description) || body.description.trim().length === 0) {
        return res.status(400).send();
    }
    console.log(body);
    if(typeof body !== 'undefined') {
    body.id = nextTodoID++;
    todos.push(body);        
    }*/
    
    db.todo.create(body).then( function(addedTodo) {
        res.json(addedTodo.toJSON());
    }, function(e) {
        res.status(400).json(e.message);
    });
    
   // res.json(body);
});

app.delete('/todos/:id', function(req, res) {
   var  deleteID = parseInt(req.params.id);
    console.log(deleteID)
    var deleteToDo = _.findWhere(todos, {id: deleteID});
    console.log(deleteToDo);
    
    if(deleteToDo){
   todos =  _.without(todos, deleteToDo);
    res.send('record on ID: ' + deleteID + ' deleted');        
    } else {
        res.status(404).json({"error": "Record not found"});
    }
});

app.put('/todos/:id', function(req, res) {
    console.log('inPUT');   
   var body = _.pick(req.body, 'description', 'isCompleted');
    var  UpdateID = parseInt(req.params.id);
    var updateToDo = _.findWhere(todos, {id: UpdateID});
    var validAttributes = {};
    
    if(body.hasOwnProperty('isCompleted') && _.isBoolean(body.isCompleted)) {
        validAttributes.isCompleted = body.isCompleted; 
       // console.log('inFAR');
    } else if(body.hasOwnProperty('isCompleted')) {
        console.log('ingar');
        return res.status(400).send();
    }
    
     if(body.hasOwnProperty('description') && _.isString(body.description)  && body.description.trim().length > 0) {
        validAttributes.description = body.description;
         //console.log('inHar');
    } else if(body.hasOwnProperty('description')) {
        //console.log('inshar');
        return res.status(400).send();
    }
     _.extend(updateToDo, validAttributes);
    res.json(updateToDo);

});


db.sequelize.sync().then(function() {
app.listen(port, function() {
    console.log('Server Started'); 
});    
});
