process.env.NODE_ENV='test';
import { expect } from 'chai';
import request from 'supertest';
import app from '../../app';
import { token } from './user';
import { meetupId } from './meetup';

let rsvpId;
/**
 * Endpoint unit tests for rsvp api
 */
describe('RSVP', () => {
    it('should post rsvp succesfully', (done) => {
        request(app)
            .post(`/api/v1/rsvps/${meetupId}/1067849b-850a-4198-a60b-e8d49463fcc8`)
            .set('Authorization', 'Bearer '+token)
            .send({ response: 'yes' })
            .then((res) => {
                rsvpId = res.body.rsvp.id;
                expect(res.status).be.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').and.equal('rsvp registered successfully');
                expect(res.body).to.have.property('rsvp').and.haveOwnProperty('id');
                expect(res.body).to.have.property('rsvp').and.haveOwnProperty('response');
                expect(res.body).to.have.property('rsvp').and.haveOwnProperty('userid');
                expect(res.body).to.have.property('rsvp').and.haveOwnProperty('meetupid');
                done();
            })
            .catch((err) => done(err));
    });
    it('should fail to post rsvp', (done) => {
        request(app)
            .post(`/api/v1/rsvps/${meetupId}/1067849b-850a-4198-a60b-e8d49463fcc8`)
            .set('Authorization', 'Bearer '+token)
            .send({ response: 'going' })
            .then((res) => {
                expect(res.status).be.equal(422);
                expect(res.body).to.have.property('message');
                expect(res.body).to.be.an('object');
                done();
            })
            .catch((err) => done(err));
    });
    it('should get all rsvps', (done) => {
        request(app)
            .get('/api/v1/rsvps')
            .set('Authorization', 'Bearer '+token)
            .then((res) => {
                expect(res.status).be.equal(200);
                expect(res.body).to.have.property('message');
                expect(res.body).to.be.an('object');
                done();
            })
            .catch((err) => done(err));
    });
    it('should get a rsvps', (done) => {
        request(app)
            .get(`/api/v1/rsvps/${rsvpId}`)
            .set('Authorization', 'Bearer '+token)
            .then((res) => {
                expect(res.status).be.equal(200);
                expect(res.body).to.have.property('message');
                done();
            })
            .catch((err) => done(err));
    });
});
