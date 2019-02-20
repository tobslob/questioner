import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';


const { expect } = chai;

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
            .post('/api/v1/question')
            .send(data)
            .end((err, res) => {
                expect(res).be.an('object');
                done();
            });
    });
    it('should return 200 OK', (done) => {
        chai.request(app)
            .post('/api/v1/question')
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
describe('/GET question upvote', () => {
    it('should return 200 status code', (done) => {
        chai.request(app)
            .get('/api/v1/question//upvote/1')
            .end((err, res) => {
                expect(res.status).be.equal(200);
                done();
            });
    });
});


/**
 * Endpoint unit tests for question downvote
 */
describe('/GET question downvote', () => {
    it('should return 200 status code', (done) => {
        chai.request(app)
            .get('/api/v1/question/downvote/1')
            .end((err, res) => {
                expect(res.status).be.equal(200);
                done();
            });
    });
});
