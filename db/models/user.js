/**
 * Created by Ivan on 17.05.2016.
 */
var Sequelize = require('Sequelize');
var bcrypt = require('bcryptjs');

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        firstName: {
            type: Sequelize.STRING,
            field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
        },
        lastName: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 70],
                    msg: 'Please enter a title with at least3 chars nut no more then  70 '
                }
            }
        },
        approved: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }


    }, {
        hooks: {
            beforeValidate: function () {
            },

            afterValidate: function (user) {
                if (user.password) {
                    user.password = bcrypt.hashSync(user.password, 8);
                }
            }
        },
        freezeTableName: true // Model tableName will be the same as the model name
    });

    return User;
};

