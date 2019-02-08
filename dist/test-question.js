import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;

chai.use(chaiHttp);


/**
 * Endpoint unit tests for question api
 */
describe('/POST question', () => {
    const data = {
        title: 'test title',
        body: 'my test description',
    };
    it('should return an object', (done) => {
        chai.request(app)
            .post('/v1/create-question')
            .send(data)
            .end((err, res) => {
                expect(res).be.an('object');
                done();
            });
    });
    it('should return 200 OK', (done) => {
        chai.request(app)
            .post('/v1/create-question')
            .send(data)
            .end((err, res) => {
                expect(res.status).be.equal(200);
                done();
            });
    });
});


/**
 * Endpoint unit tests for question upvote
 */
describe('/POST question', () => {
    it('should return 404 error', (done) => {
        chai.request(app)
            .post('/v1/upvote-question/1')
            .end((err, res) => {
                expect(res.status).be.equal(404);
                done();
            });
    });
});


/**
 * Endpoint unit tests for question downvote
 */
describe('/POST question', () => {
    it('should return 404 error', (done) => {
        chai.request(app)
            .post('/v1/downvote-question/2')
            .end((err, res) => {
                expect(res.status).be.equal(404);
                done();
            });
    });
});
