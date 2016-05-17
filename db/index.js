/**
 * Created by Ivan on 17.05.2016.
 */
var fs = require('fs');
var path = require('path');
var Sequelize = require('Sequelize');

var sequelize = new Sequelize('UserProf', 'Ivan', 'bars+951', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
var db ={};

fs.readdirSync(__dirname+'/models').forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname+'/models', file));
    db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;