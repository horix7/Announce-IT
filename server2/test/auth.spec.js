/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';

chai.should();

chai.use(chaiHttp);
const token = {
  token: null,
  tokenAdmin: null,
  token2: null,
};
const notExist = {
  email: 'diny@gmail.com',
  password: '100',
};
describe('user tests', () => {
  it('an admin should be able to signup', () => {
    const user1 = {
      firstName: 'ugizwe',
      lastName: 'divine',
      email: 'ugi@gmail.com',
      address: 'kamembe',
      password: '100',
      confirm: '100',
      phoneNumber: '0782234092',
      isAdmin: true,
    };

    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user1)
      .end((err, res) => {
        token.tokenAdmin = res.body.data.token;
        res.body.status.should.be.equal('success');
      });
  });
  it('an advertiser should be able to signup', () => {
    const user2 = {
      firstName: 'hirwa',
      lastName: 'juju',
      email: 'juju@gmail.com',
      address: 'kamembe',
      password: '100',
      confirm: '100',
      phoneNumber: '0788525846',
      isAdmin: false,
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user2)
      .end((err, res) => {
        token.token = res.body.data.token;
        res.body.status.should.be.equal('success');
      });
  });
  it('an advertiser should be able to signup', () => {
    const user3 = {
      firstName: 'ugizwe',
      lastName: 'divine',
      email: 'ugizw@gmail.com',
      address: 'kamembe',
      password: '100',
      confirm: '100',
      phoneNumber: '0782234092',
      isAdmin: false,
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user3)
      .end((err, res) => {
        token.token2 = res.body.data.token;
        res.body.status.should.be.equal('success');
      });
  });
  it('user should not be allowed to signup with a used email before', () => {
    const user1 = {
      firstName: 'ugizwe',
      lastName: 'divine',
      email: 'ugi@gmail.com',
      address: 'kamembe',
      password: '100',
      confirm: '100',
      phoneNumber: '0782234092',
      isAdmin: true,
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user1)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('That email has been used');
      });
  });
  it('user should not signup when password and confirm are different', () => {
    const userP = {
      firstName: 'ugizwe',
      lastName: 'divine',
      email: 'ugiP@gmail.com',
      address: 'kamembe',
      password: '100',
      confirm: '101',
      phoneNumber: '0782234092',
      isAdmin: true,
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userP)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('password must match confirm');
      });
  });
  it('user should be allowed to login', () => {
    const user1Login = {
      email: 'ugi@gmail.com',
      password: '100',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user1Login)
      .end((err, res) => {
        res.status.should.be.equal(200);
        res.body.status.should.be.equal('success');
      });
  });
  it('user should not login with wrong password', () => {
    const wrongPass = {
      email: 'ugi@gmail.com',
      password: '105',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(wrongPass)
      .end((err, res) => {
        res.body.error.should.be.equal('incorrect password');
      });
  });
  it('user should not login unless he has an account', () => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(notExist)
      .end((err, res) => {
        res.body.error.should.be.equal('user does not exist');
      });
  });
});

export default token;
