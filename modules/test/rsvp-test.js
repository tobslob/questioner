import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';


const { expect } = chai;

chai.use(chaiHttp);


/**
 * Endpoint unit tests for rsvp api
 */
describe('/testing of rsvp module', () => {
    describe('/POST RSVP TEST', ()=> {
        it('should return status 422 error', (done) => {
            chai.request(app)
                .post('/v1/rsvp/1')
                .end((err, res) => {
                    expect(res.status).be.equal(422);
                    done();
                });
        });
    });
});
