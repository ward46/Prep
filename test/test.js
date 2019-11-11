//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();

chai.use(chaiHttp);
it('it should GET the index.html file', (done) => {
	chai.request(server)
		.get('/index.html')
		.end((err, res) => {
            console.log(res)
			res.should.have.property("status",200);
			res.should.be.html;
		done();
		});
});
