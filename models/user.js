module.exports = function(sequelize, DataTypes){
    return sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 250]
            }
        }
    }, {
        hooks: {
            beforeValidate: function(user, options) {
                if(typeof user.email === 'string') {
                    user.email = user.email.toLowerCase();
                }
            }
        }
    });
}