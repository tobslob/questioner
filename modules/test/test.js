import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../../app';

const chaiAsPromised = require('chai-as-promised');

const should = chai.should();
chai.use(chaiAsPromised);

chai.use(chaiHttp);


describe('/POST meetup', () => {
  it('it should create meetup post with the params', (done) => {
    chai.request(app)
      .post('/v1/create-meetup')
      .end((err, res) => {
        should(res.body.status).have.a.status(201);
        done();
      });
  });
});
