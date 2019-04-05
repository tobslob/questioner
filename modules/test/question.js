// import chai from 'chai';
// import request from 'supertest';
// import app from '../../app';

// const { expect } = chai;


// /**
//  * Endpoint unit tests for question api
//  */
// describe('/POST question', () => {
//     const data = {
//         title: 'title',
//         body: 'my test description',
//     };
//     it('should post question', (done) => {
//         request(app)
//             .post('/api/v1/question')
//             .send(data)
//             .then((res) => {
//                 expect(res.status).to.equal(200);
//                 expect(res.body).to.be.an('object');
//                 expect(res.body).to.have.property('message').and.equal('Question successfully posted');
//                 expect(res.body).to.have.property('createdQuestion').and.haveOwnProperty('_id');
//                 expect(res.body).to.have.property('createdQuestion').and.haveOwnProperty('title');
//                 expect(res.body).to.have.property('createdQuestion').and.haveOwnProperty('votes');
//                 expect(res.body).to.have.property('createdQuestion').and.haveOwnProperty('body');
//                 expect(res.body).to.have.property('createdQuestion').and.haveOwnProperty('createdOn');
//                 expect(res.body).to.have.property('request').and.haveOwnProperty('type');
//                 expect(res.body).to.have.property('request').and.haveOwnProperty('url');
//                 done();
//             })
//             .catch((err) => done(err));
//     });
// });


// /**
//  * Endpoint unit tests for question upvote
//  */
// describe('PATCH /question upvote', () => {
//     it('should successfully increase votes', (done) => {
//         request(app)
//             .patch('/api/v1/question/5c7542ad885502309cb63c27/upvote')
//             .then((res) => {
//                 expect(res.status).be.equal(200);
//                 done();
//             })
//             .catch((err) => done(err));
//     });
// });


// /**
//  * Endpoint unit tests for question downvote
//  */
// describe('PATCH /question downvote', () => {
//     it('should successfully decrease votes', (done) => {
//         request(app)
//             .patch('/api/v1/question/5c7542ad885502309cb63c27/downvote')
//             .then((res) => {
//                 expect(res.status).be.equal(200);
//                 done();
//             })
//             .catch((err) => done(err));
//     });
// });
