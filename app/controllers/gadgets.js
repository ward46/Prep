'use strict'

mongoose = require('mongoose'),
Gadgets = mongoose.model('Gadgets');

var express = require('express'),  
    router = express.Router(),  
    logger = require('../../config/logger');

module.exports = function (app, config) {
    app.use('/api', router);

    router.route('/gadgets').get((req, res, next) => {
        logger.log('info', 'Get all gadgets');
        var query = Gadgets.find()        
        .sort(req.query.order)        
        .exec()        
        .then(result => {            
            if(result && result.length) {            
                res.status(200).json(result);        
            } else {            
                res.status(404).json({message: "No gadgets"});        
            }        
        })        
        .catch(err => {          
            return next(err);        
        });
    });

    router.route('/gadgets/:id').get((req, res, next) => {        
        logger.log('info','Get gadget %s', req.params.id);        
        Gadgets.findById(req.params.id)            
        .then(gadget => {                
            if (gadget) {                    
                res.status(200).json(gadget);                
            } else {                    
                res.status(404).json({ 
                    message: "No gadget found" });                
                }            
        })            
        .catch(error => {                
            return next(error);            
        });
    }); 

    router.route('/test/:id/:name').get((req, res, next) => {
        var id = req.params.id;
        var name = req.params.name;
        var obj = {'id' : id, ' name ' : name};
        res.status(200).json(obj);
    });

    router.route('/gadgets').post((req, res, next) => {
        logger.log('info', 'Create gadget'); 
        var gadget = new Gadget(req.body);
        gadget.save()
        .then(result => {          
            res.status(201).json(result);      
        })      
        .catch(err => {         
            return next(err);      
        });
    });

    router.route('/gadgets/:id').put((req, res, next) => {        
        logger.log('info', 'Get gadget %s', req.params.id);        
        Gadgets.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, multi: false })            
            .then(gadget => {                
                res.status(200).json(gadget);            
            })            
            .catch(error => {                
                return next(error);            
            });    
    });

    router.route('/gadgets/:id').delete((req, res, next) => {        
        logger.log('info', 'Delete gadget ' + req.params.id);        
        Gadgets.remove({ _id: req.params.id })            
            .then(gadget => {                
                res.status(200).json({ msg: "Gadget Deleted" });            
            })            
            .catch(error => {                
                return next(error);            
            });    
    });
};