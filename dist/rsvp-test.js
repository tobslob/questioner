process.env.NODE_ENV === 'test';
import chai from 'chai';
import request from 'supertest';
import {app, connect, close} from '../../app';

const { expect } = chai;

before((done) => {
    connect()
        .then(() => done())
        .catch((err) => done(err));
});

after((done) => {
    close()
        .then(() => done())
        .catch((err) => done(err));
});


/**
 * Endpoint unit tests for rsvp api
 */
describe('/testing of rsvp module', () => {
    describe('POST /rsvp', ()=> {
        it('should post rsvp succesfully', (done) => {
            request(app)
                .post('/api/v1/rsvp')
                .send({ response: 'yes'||'maybe'||'no', meetup: '5c77ad6c60dd92011cb893a3' })
                .then((res) => {
                    const body = res.body;
                    expect(res.status).be.equal(201);
                    expect(body).to.be.an('object');
                    expect(body).to.have.property('message').and.equal('Created rsvp successfully');
                    expect(body).to.have.property('createdRsvp').and.haveOwnProperty('_id');
                    expect(body).to.have.property('createdRsvp').and.haveOwnProperty('response');
                    expect(body).to.have.property('createdRsvp').and.haveOwnProperty('request');
                    done();
                })
                .catch((err) => done(err));
        });
        it('should fail to post rsvp', (done) => {
            request(app)
                .post('/api/v1/rsvp')
                .send({ response: 'going' })
                .then((res) => {
                    expect(res.status).be.equal(422);
                    done();
                })
                .catch((err) => done(err));
        });
    });
});
