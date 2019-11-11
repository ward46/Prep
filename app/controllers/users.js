'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger');
module.exports = function (app, config) {
    app.use('/api', router);

    router.route('/users').get((req, res, next) => {
        logger.log('info', 'Get all users');
        res.status(200).json({ message: 'Got all users' });

    });
    router.route('/users').post((req, res, next) => {
        logger.log('info', 'Create user');
        res.status(201).json({ message: 'Created user' });

    });
    router.route("/users/:id").get((req, res, next) => {
        logger.log('info', 'Get user %s', req.params.id);

        res.status(200).json({ id: req.params.id });
    });
    router.route("/users/login").post((req, res, next) => {
         logger.log('info', '%s logging in', req.body.email);
        var email = req.body.email
        var password = req.body.password;
  
        var obj = {'email' : email, 'password' : password};
      res.status(201).json(obj);
  });
  


};
