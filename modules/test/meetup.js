process.env.NODE_ENV='test';
import { expect } from 'chai';
import request from 'supertest';
import app from '../../app';
import faker from 'faker';

import { token } from './user';

let meetupId;
/**
 * Post meetup endpoint test
 */
describe('MEETUP', () => {
    it('should fail to create meetup', (done) =>{
        request(app)
            .post('/api/v1/meetup')
            .set('Authorization', 'Bearer '+token)
            .send({
                location: faker.address.streetAddress(),
                body: faker.lorem.text(),
                happeningOn: '1995-12-17T03:24:00',
                Tags: [],
            })
            .then((res) => {
                expect(res.status).to.equal(422);
                expect(res.body).to.have.property('message');
                done();
            })
            .catch((err) => done(err));
    });
    it('sould create a meetup', (done) => {
        request(app)
            .post('/api/v1/meetup')
            .set('Authorization', 'Bearer '+token)
            .send({
                topic: faker.lorem.words(15),
                location: faker.address.streetAddress(),
                body: faker.lorem.text(),
                happeningOn: '1995-12-17T03:24:00',
                Tags: [],
            })
            .then((res) => {
                meetupId = res.body.meetups.id;
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                done();
            })
            .catch((err) => done(err));
    });
    it('should retrieve all meetup', (done) => {
        request(app)
            .get('/api/v1/meetup')
            .set('Authorization', 'Bearer '+token)
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res).to.be.an('object');
                expect(res.body).to.have.property('message');
                done();
            })
            .catch((err) => done(err));
    });
    it('should not retrieve a meetup if id is not found', (done) => {
        request(app)
            .get('/api/v1/meetup/a10bc539-c284-4c61-a5b2-7620e3c7e0eb')
            .set('Authorization', 'Bearer '+token)
            .then((res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.have.property('message');
                done();
            })
            .catch((err) => done(err));
    });
    it('should retrieve a meetup', (done) => {
        request(app)
            .get(`/api/v1/meetup/${meetupId}`)
            .set('Authorization', 'Bearer '+token)
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res).to.be.an('object');
                done();
            })
            .catch((err) => done(err));
    });
    it('should not edit a meetup if id is not found', (done) => {
        request(app)
            .patch('/api/v1/meetup/a10bc539-c284-4c61-a5b2-7620e3c7e0eb')
            .set('Authorization', 'Bearer '+token)
            .then((res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.have.property('message');
                done();
            })
            .catch((err) => done(err));
    });
    it('should able to edit meetup', (done) => {
        request(app)
            .patch(`/api/v1/meetup/${meetupId}`)
            .set('Authorization', 'Bearer '+token)
            .send({
                topic: faker.lorem.words(15),
                location: faker.address.streetAddress(),
                body: faker.lorem.text(),
                happeningOn: '1995-12-17T03:24:00',
                Tags: ['meeup', 'some new about code'],
            })
            .then((res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.an('object');
                done();
            })
            .catch((err) => done(err));
    });
});

export {meetupId};