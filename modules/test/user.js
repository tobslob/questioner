process.env.NODE_ENV === 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import faker from 'faker';
import moment from 'moment';

const { expect } = chai;
// using chai-http middleware
chai.use(chaiHttp);

describe('POST USER', () => {
    it('Should successfully create a user account if inputs are valid', (done) => {
        chai.request(app)
            .post('/api/v1/user/signup')
            .type('json')
            .send({
                userImage: faker.image.people(),
                firstName: 'Kazeem',
                lastName: 'Odutola',
                otherName: 'Oluwatobi',
                email: 'tester@gmail.com',
                password: 'Kazeem27',
                userName: 'Kaz',
                phoneNumber: '080874568356',
                isAdmin: 'yes',
                createdOn: moment(new Date())
            })
            .then((res) => {
                // eslint-disable-next-line no-console
                console.log(res);
                const { body } = res;
                expect(body).to.be.an('object');
                expect(body.status).to.be.equals(201);
                expect(body.data).to.be.an('object');
                expect(body.data.token).to.be.a('string');
                done();
            })
            .catch((error) => done(error));
    });
});