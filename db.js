var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'Sqlite',
    'storage': __dirname+ '/data/toDO-api-database.sqlite'
});

db = {};
db.todo = sequelize.import(__dirname + '/models/todo.js');
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;