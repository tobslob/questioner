import chai from 'chai';
import request from 'supertest';
import app from '../../app';

const { expect } = chai;


describe('USER PAGE', () => {
    it('Should redirect to home page', (done) => {
        request(app)
            .get('/')
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                done();
            })
            .catch((err) => done(err));
    });
    it('Should redirect to login page', (done) => {
        request(app)
            .get('/sign-in.html')
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                done();
            })
            .catch((err) => done(err));
    });
    it('Should redirect to signup page', (done) => {
        request(app)
            .get('/sign-up.html')
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                done();
            })
            .catch((err) => done(err));
    });
    it('Should redirect to meetup page', (done) => {
        request(app)
            .get('/meetup-post.html')
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                done();
            })
            .catch((err) => done(err));
    });
    it('Should redirect to meetup post page', (done) => {
        request(app)
            .get('/meetuppostpage.html')
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                done();
            })
            .catch((err) => done(err));
    });
    it('Should redirect to Admin page', (done) => {
        request(app)
            .get('/admin.html')
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                done();
            })
            .catch((err) => done(err));
    });
    it('Should redirect to User profile', (done) => {
        request(app)
            .get('/userprofile.html')
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                done();
            })
            .catch((err) => done(err));
    });
    it('Should redirect to password reset page', (done) => {
        request(app)
            .get('/password-reset.html')
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                done();
            })
            .catch((err) => done(err));
    });
});