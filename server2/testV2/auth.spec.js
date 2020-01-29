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

describe('user tests', () => {
  it('an admin should be able to signup', (done) => {
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
      .post('/api/v2/auth/signup')
      .send(user1)
      .end((err, res) => {
        token.tokenAdmin = res.body.data.dataToken;
        res.body.status.should.be.equal('success');
        done();
      });
  });
  it('an advertiser should be able to signup', (done) => {
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
      .post('/api/v2/auth/signup')
      .send(user2)
      .end((err, res) => {
        token.token = res.body.data.dataToken;
        res.body.status.should.be.equal('success');
        done();
      });
  });
  it('an advertiser two should be able to signup', (done) => {
    const user3 = {
      firstName: 'ugizwe',
      lastName: 'divine',
      email: 'vine@gmail.com',
      address: 'kamembe',
      password: '100',
      confirm: '100',
      phoneNumber: '0782234092',
      isAdmin: false,
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(user3)
      .end((err, res) => {
        token.token2 = res.body.data.dataToken;
        res.body.status.should.be.equal('success');
        done();
      });
  });
  it('user should not be allowed to signup with a used email before', (done) => {
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
      .post('/api/v2/auth/signup')
      .send(user1)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('User exists');
        done();
      });
  });
  it('user should not signup when password and confirm are different', (done) => {
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
      .post('/api/v2/auth/signup')
      .send(userP)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('Password must match Confirm');
        done();
      });
  });

  it('user should be allowed to login', (done) => {
    const notExist = {
      email: 'ugi@gmail.com',
      password: '100',

    };
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(notExist)
      .end((err, res) => {
        res.body.status.should.be.equal('success');
        done();
      });
  });
  it('user should not login with wrong password', (done) => {
    const wrongPass = {
      email: 'ugi@gmail.com',
      password: '105',
    };
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(wrongPass)
      .end((err, res) => {
        res.body.error.should.be.equal('Wrong password');
        done();
      });
  });
  it('user should not login unless he has an account', () => {
    const notExist = {
      email: 'eli1@gm.co',
      password: '0788',

    };
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(notExist)
      .end((err, res) => {
        res.body.error.should.be.equal('user does not exist');
      });
  });
});

export default token;
