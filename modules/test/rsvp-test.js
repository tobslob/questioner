import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;

chai.use(chaiHttp);


/**
 * Endpoint unit tests for rsvp api
 */
describe('/POST RSVP', () => {
  const response = 'maybe' || 'yes' || 'no';
  it('should return status 422 error', (done) => {
    chai.request(app)
      .post('/v1/create-question')
      .send(response)
      .end((err, res) => {
        expect(res.status).be.equal(422);
        done();
      });
  });
});
