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
  it('user signup', () => {
    const user1 = {
      id: 100,
      first_name: 'ugizwe',
      last_name: 'divine',
      email: 'ugi@gmail.com',
      address: 'kamembe',
      password: '100',
      phoneNumber: '0782234092',
      is_admin: true,
    };
    const user2 = {
      id: 101,
      first_name: 'hirwa',
      last_name: 'juju',
      email: 'juju@gmail.com',
      address: 'kamembe',
      password: '100',
      phoneNumber: '0788525846',
      is_admin: false,
    };
    const user3 = {
      id: 103,
      first_name: 'ugizwe',
      last_name: 'divine',
      email: 'ugizw@gmail.com',
      address: 'kamembe',
      password: '100',
      phoneNumber: '0782234092',
      is_admin: false,
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user1)
      .end((err, res) => {
        token.tokenAdmin = res.body.data.token;
        res.body.status.should.be.equal('success');
      });
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user3)
      .end((err, res) => {
        token.token2 = res.body.data.token;
        res.body.status.should.be.equal('success');
      });
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user2)
      .end((err, res) => {
        token.token = res.body.data.token;
        res.body.status.should.be.equal('success');
      });
  });
  it('user signup', () => {
    const user1 = {
      id: 100,
      first_name: 'ugizwe',
      last_name: 'divine',
      email: 'ugi@gmail.com',
      address: 'kamembe',
      password: '100',
      phoneNumber: '0782234092',
      is_admin: true,
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user1)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.status.should.be.equal('error');
      });
  });
  it('user signup', () => {
    const user1 = {
      id: 101,
      first_name: 'ugizwe',
      last_name: 'divine',
      email: 'ugi@gmail.com',
      address: 'kamembe',
      password: '100',
      phoneNumber: '0782234092',
      is_admin: true,
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user1)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.status.should.be.equal('error');
      });
  });
  it('user login', () => {
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
  it('user login wrong password', () => {
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
  it('user does not exist', () => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(notExist)
      .end((err, res) => {
        res.body.error.should.be.equal('user does not exist');
      });
  });
});

export default token;
