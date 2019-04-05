import chai from 'chai';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';
import authMiddleware from '../middleware/check-auth';

const { expect } = chai;

describe('Auth middleware', function () {
    it('should throw an error if no authorization header is present', () => {
        const req = {
            get: function () {
                return null;
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => { })).to.throw(
            'Not authenticated.'
        );
    });
    it('should throw an error if the authorization header is only one string', () => {
        const req = {
            get: function() {
                return 'xyz';
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
    });
    it('should yield a userId after decoding the token', function() {
        const req = {
            get: function() {
                return 'Bearer djfkalsdjfaslfjdlas';
            }
        };
        sinon.stub(jwt, 'verify');
        jwt.verify.returns({ userId: 'abc' });
        authMiddleware(req, {}, () => {});
        expect(req).to.have.property('userId');
        expect(req).to.have.property('userId', 'abc');
        expect(jwt.verify.called).to.be.true;
        jwt.verify.restore();
    });
    
    it('should throw an error if the token cannot be verified', function() {
        const req = {
            get: function() {
                return 'Bearer xyz';
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
    });   
});