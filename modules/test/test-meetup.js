import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import meetup from '../db/meetupdb';

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
chai.use(chaiHttp);

/**
 * Post meetup endpoint test
 */
describe('/POST meetup', () => {
    const id = meetup.meetuppost.length + 1;
    const createdOn = new Date();
    const data = {
        id,
        createdOn,
        topic: 'Agile meetup',
        happeningOn: '2019-01-28T17:31:47.000Z',
        body: 'This is description on the best programming lang to learn in 2019',
        location: 'Abuja',
        Tags: [
            'Agile',
            'mocha',
            'chai',
        ],
    };
    it('should return 422 error', (done) => {
        chai.request(app)
            .post('/v1/create-meetup')
            .send(data)
            .end((err, res) => {
                expect(res.status).to.equal(422);
                done();
            });
    });
    it('should post an object', (done) => {
        chai.request(app)
            .get('/v1/create-meetup')
            .end((err, res) => {
                if (err) throw err;
                expect(res).to.be.an('object');
                done();
            });
    });
});


/**
 * Get all meetup endpoint test
 */
describe('/GET all meetup', () => {
    it('should retrieve all meetup', (done) => {
        chai.request(app)
            .get('/v1/get-all-meetup')
            .end((err, res) => {
                if (err) throw err;
                expect(res).to.be.an('object');
                done();
            });
    });
    it('should return status code of 200', (done) => {
        chai.request(app)
            .get('/v1/get-all-meetup')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                done();
            });
    });
});


/**
 * Get a specific meetup endpoint test
 */
describe('/GET specific meetup', () => {
    it('should retrieve specific meetup', (done) => {
        chai.request(app)
            .get('/v1/get-specific-meetup/1')
            .end((err, res) => {
                if (err) throw err;
                expect(res).to.be.an('object');
                done();
            });
    });
    it('should return status code of 200', (done) => {
        chai.request(app)
            .get('/v1/get-specific-meetup/1')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                done();
            });
    });
});


/*
 * Edit meetup post endpoint test
 */
describe('/EDIT specific meetup', () => {
    it('should edit specific meetup', (done) => {
        chai.request(app)
            .get('/v1/edit-meetup-post/1')
            .end((err, res) => {
                if (err) throw err;
                expect(res).to.be.an('object');
                done();
            });
    });
    it('should retrn status 404 error', (done) => {
        chai.request(app)
            .get('/v1/edit-meetup-post/1')
            .end((err, res) => {
                expect(res.status).to.be.equal(404);
                done();
            });
    });
});


/*
 * Delete meetup post endpoint test
 */
describe('/DELETE specific meetup', () => {
    it('should delete specific meetup', (done) => {
        chai.request(app)
            .get('/v1/delete-meetup/1')
            .end((err, res) => {
                expect(res).to.be.an('object');
                done();
            });
    });
    it('should return status 404 error', (done) => {
        chai.request(app)
            .get('/v1/delete-meetup/1')
            .end((err, res) => {
                expect(res.status).to.be.equal(404);
                done();
            });
    });
});
