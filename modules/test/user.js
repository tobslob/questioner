process.env.NODE_ENV='test';
import { expect } from 'chai';
import request from 'supertest';
import app from '../../app';
import faker from 'faker';

let token, userId;

describe('USER', () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    it('Should not create a user account if inputs are incomplete and return 422 status code', (done) => {
        request(app)
            .post('/api/v1/user/signup')
            .send({
                lastName: faker.name.lastName(),
                otherName: faker.name.lastName(),
                email,
                password,
                userName: faker.internet.userName(),
                phoneNumber: faker.phone.phoneNumber(),
                isAdmin: 'yes',
            })
            .then((res) => {
                expect(res.status).to.equal(422);
                expect(res.body).to.have.property('message');
                done();
            }).catch((error) => done(error));
    });
    it('Should not create a user account if invalid email and return 422 statusCode', (done) => {
        request(app)
            .post('/api/v1/user/signup')
            .send({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                otherName: faker.name.lastName(),
                email: 'mail.com',
                password,
                userName: faker.internet.userName(),
                phoneNumber: faker.phone.phoneNumber(),
                isAdmin: 'yes',
            })
            .then((res) => {
                expect(res.status).to.equal(422);
                expect(res.body).to.have.property('message');
                done();
            }).catch((error) => done(error));
    });
    it('Should not create a user account if password is less than 8', (done) => {
        request(app)
            .post('/api/v1/user/signup')
            .send({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                otherName: faker.name.lastName(),
                email,
                password: 'wetaj5',
                userName: faker.internet.userName(),
                phoneNumber: faker.phone.phoneNumber(),
                isAdmin: 'yes',
            })
            .then((res) => {
                expect(res.status).to.equal(422);
                expect(res.body).to.have.property('message');
                done();
            }).catch((error) => done(error));
    });
    it('Should successfully create a user account if inputs are valid', (done) => {
        request(app)
            .post('/api/v1/user/signup')
            .send({
                firstName: 'Oluwatobi',
                lastName: 'Odutola',
                otherName: 'Kazeem',
                email,
                password,
                userName: 'kazb',
                phoneNumber: faker.phone.phoneNumber(),
                isAdmin: 'yes',
            })
            .then((res) => {
                userId = res.body.users.id;
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('token');
                expect(res.body).to.have.property('users');
                expect(res.body).to.have.property('message');
                done();
            }).catch((error) => done(error));
    });
    it('should not login user with incorrect password', (done) => { 
        request(app)
            .post('/api/v1/user/login')
            .send({ email, password: 'mypassword' })
            .then((res) => {
                token = res.body.token;
                expect(res.status).to.be.equal(401);
                expect(res.body).to.have.property('message');
                done();
            })
            .catch((error) => done(error));
    });
    it('should not login user with incorrect mail', (done) => { 
        request(app)
            .post('/api/v1/user/login')
            .send({ email: 'mymail@gmail.com', password })
            .then((res) => {
                token = res.body.token;
                expect(res.status).to.be.equal(401);
                expect(res.body).to.have.property('message');
                done();
            })
            .catch((error) => done(error));
    });
    it('should login user successfully', (done) => { 
        request(app)
            .post('/api/v1/user/login')
            .send({ email, password })
            .then((res) => {
                token = res.body.token;
                expect(res.status).to.be.equal(200);
                expect(res.body).to.have.property('token');
                done();
            })
            .catch((error) => done(error));
    });
    it('Should successfully get all users', (done) => {
        request(app)
            .get('/api/v1/user')
            .set('Authorization', 'Bearer '+token)
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.be.equals(200);
                done();
            })
            .catch((error) => done(error));
    });
    it('Should not get a user if userId is not found', (done) => {
        request(app)
            .get('/api/v1/user/1cf7f66e-e737-4417-8299-83596ed01302')
            .set('Authorization', 'Bearer '+token)
            .then((res) => {
                expect(res.status).to.be.equals(404);
                expect(res.body).to.have.property('message');
                done();
            })
            .catch((error) => done(error));
    });
    // it('Should successfully get a single user', (done) => {
    //     request(app)
    //         .get(`/api/v1/user/${userId}`)
    //         .set('Authorization', 'Bearer '+token)
    //         .then((res) => {
    //             expect(res.body).to.be.an('object');
    //             expect(res.status).to.be.equals(200);
    //             done();
    //         })
    //         .catch((error) => done(error));
    // });
    it('Should not patch user if userId is not found', (done) => {
        request(app)
            .patch('/api/v1/user/1cf7f66e-e737-4417-8299-83596ed01302')
            .set('Authorization', 'Bearer ' + token)
            .send({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                otherName: faker.name.lastName(),
                password,
                phoneNumber: faker.phone.phoneNumber()
            })
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.be.equals(404);
                done();
            })
            .catch((error) => done(error));
    });
    it('Should successfully patch a user', (done) => {
        request(app)
            .patch(`/api/v1/user/${userId}`)
            .set('Authorization', 'Bearer ' + token)
            .send({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                otherName: faker.name.lastName(),
                password,
                phoneNumber: faker.phone.phoneNumber()
            })
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.be.equals(200);
                done();
            })
            .catch((error) => done(error));
    });
    it('Should not delete a user if userId is not found', (done) => {
        request(app)
            .delete('/api/v1/user/1cf7f66e-e737-4417-8299-83596ed01302')
            .set('Authorization', 'Bearer '+token)
            .then((res) => {
                expect(res.status).to.be.equals(404);
                expect(res.body).to.have.property('message');
                done();
            })
            .catch((error) => done(error));
    });
    it('Should successfully delete a single user', (done) => {
        request(app)
            .delete(`/api/v1/user/${userId}`)
            .set('Authorization', 'Bearer '+token)
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.status).to.be.equals(200);
                done();
            })
            .catch((error) => done(error));
    });
});

export {
    token,
    userId
};
