/**
 * Created by Ivan on 17.05.2016.
 */
'use strict';

var express = require('express');
//var controller = require('./account.controller');

var router = express.Router();

router.post('/addUsername', function(req, res){
    console.log('$$$$$$$$$$$$', req.body, req.query, req.params);
    var db = req.app.get('db');
    db.User.create({
      title: 'gggggggggggggggggWWWWWWggggggg',
      firstName:'SWentus',
      lastName:'Jonson',
      password: 'ssdsd ds adsadsad a'
      }).then(function(result){
        console.log('^^^^^^^6', result);
        res.send(result)
    })
});
//router.post('/createAccount', controller.createAccount);

module.exports = router;