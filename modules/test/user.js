process.env.NODE_ENV === 'test';
import { expect } from 'chai';
import request from 'supertest';
import app from '../../app';
import faker from 'faker';

describe('POST USER', () => {
    it('Should successfully create a user account if inputs are valid', (done) => {
        request(app)
            .post('/api/v1/user/signup')
            .send({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                otherName: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                userName: faker.internet.userName(),
                phoneNumber: faker.phone.phoneNumber(),
                isAdmin: 'yes',
                userImage: faker.image.people(),
            })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.eql(200);
                done();
            });
    });
});