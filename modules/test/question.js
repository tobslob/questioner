process.env.NODE_ENV='test';
import { expect } from 'chai';
import request from 'supertest';
import app from '../../app';
import faker from 'faker';
import { token } from './user';
import { meetupId } from './meetup';

let questionId;

/**
 * Endpoint unit tests for question api
 */
describe('QUESTION', () => {
    it('should post question', (done) => {
        request(app)
            .post(`/api/v1/question/${meetupId}`)
            .set('Authorization', 'Bearer '+token)
            .send({
                title: faker.lorem.word(10),
                body: faker.lorem.text()
            })
            .then((res) => {
                questionId = res.body.questions.id;
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').and.equal('question created successfully');
                expect(res.body).to.have.property('questions').and.haveOwnProperty('id');
                expect(res.body).to.have.property('questions').and.haveOwnProperty('title');
                expect(res.body).to.have.property('questions').and.haveOwnProperty('meetupid');
                expect(res.body).to.have.property('questions').and.haveOwnProperty('votes');
                expect(res.body).to.have.property('questions').and.haveOwnProperty('body');
                expect(res.body).to.have.property('questions').and.haveOwnProperty('createdon');
                done();
            })
            .catch((err) => done(err));
    });
    it('should get all question', (done) => {
        request(app)
            .get('/api/v1/question/')
            .set('Authorization', 'Bearer '+token)
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                done();
            })
            .catch((err) => done(err));
    });
    it('should not get question if not found', (done) => {
        request(app)
            .get('/api/v1/question/8a732477-b083-450c-ac69-c0710f71d080')
            .set('Authorization', 'Bearer '+token)
            .then((res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                done();
            })
            .catch((err) => done(err));
    });
    it('should get a question', (done) => {
        request(app)
            .get(`/api/v1/question/${questionId}`)
            .set('Authorization', 'Bearer '+token)
            .send({
                title: faker.lorem.word(10),
                body: faker.lorem.text()
            })
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                done();
            })
            .catch((err) => done(err));
    });
    it('should not vote a question if not found', (done) => {
        request(app)
            .post('/api/v1/question/8a732477-b083-450c-ac69-c0710f71d080/upvote')
            .set('Authorization', 'Bearer '+token)
            .then((res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
                done();
            })
            .catch((err) => done(err));
    });
    it('should successfully upvote a question', (done) => {
        request(app)
            .post(`/api/v1/question/${questionId}/upvote`)
            .set('Authorization', 'Bearer '+token)
            .send({
                title: faker.lorem.word(10),
                body: faker.lorem.text()
            })
            .then((res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                done();
            })
            .catch((err) => done(err));
    });
    it('should not downvote a question if not found', (done) => {
        request(app)
            .post('/api/v1/question/8a732477-b083-450c-ac69-c0710f71d080/downvote')
            .set('Authorization', 'Bearer '+token)
            .then((res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
                done();
            })
            .catch((err) => done(err));
    });
    it('should successfully downvote a question', (done) => {
        request(app)
            .post(`/api/v1/question/${questionId}/downvote`)
            .set('Authorization', 'Bearer '+token)
            .then((res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                done();
            })
            .catch((err) => done(err));
    });
});

export { questionId };