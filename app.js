var Sequelize =require('Sequelize');
var bcrypt = require('bcryptjs');
/*--
var connection = new Sequelize('UserProf', 'Ivan_Malakhov', 'bars+951',{
  host: 'localhost',
  dialect: 'postgres',

  pool: {
  max: 5,
    min: 0,
    idle: 10000
}
});*/
// Or you can simply use a connection uri
var connection = new Sequelize('postgres://localhost:7000/UserProf');

var User = connection.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING
  },
  password:{
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      len: {
        args: [3,70],
        msg:'Please enter a title with at least3 chars nut no more then  70 '
    }
    }
  },
  approved:{
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }


}, {
  hooks:{
    beforeValidate: function(){},

    afterValidate: function(user){
      user.password=bcrypt.hashSync(user.password,8);
    }
  },
  freezeTableName: true // Model tableName will be the same as the model name
});
/*создали таблицу
User.sync({force: true}).then(function () {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});
*/

connection.sync(
  {force: true},/* - для удаления и создание БД заново */
  {logger: console.log}/* - логер в баШ */
).then(function () {
  //-------из переменной обьекта запроса
  var req={
    body:{
        title: 'sWq1xx2swWxxWWs',
        firstName:'Sam',
        lastName:'Jonson',
        password: 'ssdsd ds aeeedsadsad a',
        approved: true
    }
  };
  User.create(req.body,{
  fields:['title','firstName','lastName','password'] // говорит какие поля разрешено ищзменять данному запросу()
  }).then(function(insertObj){
    console.log(insertObj.dataValues);
  });
  /*Создание новой записи ---------------------*/
  /*User.create({
    title: 'sWAWWs',
    firstName:'Sam',
    lastName:'Jonson',
    password: 'ssdsd ds adsadsad a'
  })
//});
*/
/*
User.sync().then(function () {*/
  // Найти все элементы в ДБ - обект
  /*User.findAll().then(function(items){
    console.log(items); //- обект
  })*/
}).catch(function(error){
  console.log(error);
});/**/