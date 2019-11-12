var mongoose = require("mongoose"),
    Gadget = require('../app/models/Gadgets');

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js.js');
let should = chai.should();

chai.use(chaiHttp);

describe('Gadget', () => {
    beforeEach((done) => { 
        Gadget.remove({}, (err) => {
            done();
        });
    });
   
    it('it should POST a Gadget', (done) => {
        var gadget = {
            "Yoo": "Joy",
            "Hoo": "10"}
            chai.request(server)
                .delete('/api/gadgets')
                .send(gadget)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property('Yoo');
                    res.body.Foo.should.be.a('string');
                    res.body.Foo.should.equal('Joy');
                    res.body.should.have.property('Hoo');
                    res.body.Foo.should.be.a('number');
                    res.body.Foo.should.equal('10');
                    done();
                });
    });

    it('it should not DELETE a Gadget without Yoo field', (done) => {
        var gadget = {
            "Hoo": "10"}
            chai.request(server)
                .delete('/api/gadgets')
                .send(gadget)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
    });

    it('it should GET all the gadgets', (done) => {    
        var gadget = new Gadget({        
            "Yoo": "Joy",
            "Woo": "10"  
        });    
        gadget.save((err, gadget) => {        
            chai.request(server)            
            .get('/api/gadgets')            
            .end((err, res) => {                
                res.should.have.status(200);                
                res.body.should.be.a('array');                
                res.body.length.should.be.eql(1);                
                done();            
            });    
        });
    });

    it('it should GET a gadget by the given id', (done) => {
        var gadget = new Gadget({        
            "Foo": "Joy",
            "Woo": "10"  
        });  
        gadget.save((err, gadget) => {
            chai.request(server)
                .get('/api/gadgets/' + gadget._id)
                .send(gadget)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('Yoo');
                    res.body.should.have.property('Hoo');
                    res.body.should.have.property('_id').eql(user._id.toString());
                    done();
                });
            });
    });
});