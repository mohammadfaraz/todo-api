var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;
if(env === 'production') {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres'
    });
} else {
    sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'Sqlite',
    'storage': __dirname+ '/data/toDO-api-database.sqlite'
});
}

db = {};
db.todo = sequelize.import(__dirname + '/models/todo.js');
db.user = sequelize.import(__dirname + '/models/user.js');
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;