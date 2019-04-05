// process.env.NODE_ENV = 'test';
// import chai from 'chai';
// import request from 'supertest';
// import {app, connect, close} from '../../app';

// const { expect } = chai;

// before((done) => {
//     connect()
//         .then(() => done())
//         .catch((err) => done(err));
// });

// after((done) => {
//     close()
//         .then(() => done())
//         .catch((err) => done(err));
// });

// /**
//  * Post meetup endpoint test
//  */
// describe('POST /post meetup', () =>{
//     const data = {
//         topic: 'Agile meetup',
//         happeningOn: '2019-01-28T17:31:47.000Z',
//         body: 'This is description on the best programming lang to learn in 2019',
//         location: 'Abuja',
//         Tags: [
//             'Agile',
//             'mocha',
//             'chai',
//         ],
//         meetupImage: 'Capture.PNG'
//     };
//     describe('POST /meetup', () => {
//         it('Create creating a new meetup works', (done) => {
//             request(app)
//                 .post('/api/v1/meetup')
//                 .send(data)
//                 .then((res) => {
//                     expect(res.status).to.equal(200);
//                     expect(res.body).to.be.an('object');
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });
//         it('should fail to post meetup', (done) =>{
//             request(app)
//                 .post('/api/v1/meetup')
//                 .send({
//                     topic: 'Agile meetup',
//                     happeningOn: '2019-01-28T17:31:47.000Z',
//                     body: 'This is description on the best programming lang to learn in 2019',
//                     Tags: [
//                         'Agile',
//                         'mocha',
//                         'chai',
//                     ], })
//                 .then((res) => {
//                     expect(res.status).to.equal(422);
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });
//     });
// });


// /**
//  * Get all meetup endpoint test
//  */
// describe('GET /all meetup', () => {
//     it('should retrieve all meetup', (done) => {
//         request(app)
//             .get('/api/v1/meetup')
//             .then((res) => {
//                 expect(res.status).to.equal(200);
//                 expect(res).to.be.an('object');
//                 expect(res).not.to.have.property('_v');
//                 done();
//             })
//             .catch((err) => done(err));
//     });
// });


// /**
//  * Get a specific meetup endpoint test
//  */
// describe('GET /specific meetup', () => {
//     it('should retrieve specific meetup', (done) => {
//         request(app)
//             .get('/api/v1/meetup/5c73e0625ed99017fcda8d2c')
//             .then((res) => {
//                 expect(res.status).to.equal(200);
//                 expect(res).to.be.an('object');
//                 done();
//             })
//             .catch((err) => done(err));
//     });
// });


// /*
//  * Edit meetup post endpoint test
//  */
// describe('PATCH /specific meetup', () => {
//     it('should edit location of the spec meetup', (done) => {
//         request(app)
//             .patch('/api/v1/meetup/5c73e09afa470001a49177a7')
//             .send([{'propName': 'location', 'value': 'Patched ikeja'}
//             ])
//             .then((res) => {
//                 expect(res.status).to.be.equal(200);
//                 expect(res).to.be.an('object');
//                 done();
//             })
//             .catch((err) => done(err));
//     });
// });


// /*
//  * Delete meetup post endpoint test
//  */
// describe('DELETE /specific meetup', () => {
//     it('should delete specific meetup', (done) => {
//         request(app)
//             .delete('/api/v1/meetup/5c6ea5afd8ca562ba8517a09')
//             .end((err, res) => {
//                 expect(res.status).to.equal(200);
//                 expect(res).to.be.an('object');
//                 done();
//             });
//     });
// });
