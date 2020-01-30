/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import token from './auth.spec';

chai.should();

chai.use(chaiHttp);
const announcement = {
  status: 'accepted',
  text: 'you should pay schoolfees',
  startDate: '2020-01-15T22:55:44.356Z',
  endDate: '2020-06-10T22:55:44.356Z',
};
const announcement1 = {
  status: 'active',
  text: 'you should pay schoolfees',
  startDate: '2020-01-15T22:55:44.356Z',
  endDate: '2020-06-10T22:55:44.356Z',
};
const announcement2 = {
  status: 'active',
  text: '',
  startDate: '',
  endDate: '',
};
const wrongToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1a2lAZ21haWwuY29tIiwiaWQiOjE4NDEsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE1Nzk4MTcxNjh9.1u-ZdPxLjeImFinFx2vJQC1dfiMsiVTAzRjvnFfV1P4';

describe('announcement tests', () => {
  let id;
  it('should not create announcement if not logged in', (done) => {
    chai.request(app)
      .post('/api/v2/announcement')
      .send(announcement)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.status.should.be.equal('error');
        done();
      });
  });
  it('should create announcement with valid inputs', (done) => {
    chai.request(app)
      .post('/api/v2/announcement')
      .set('token', token.token)
      .send(announcement2)
      .end((err, res) => {
        res.status.should.be.equal(400);
        done();
      });
  });
  it('should allow an advertiser to create announcement', (done) => {
    chai.request(app)
      .post('/api/v2/announcement')
      .set('token', token.token)
      .send(announcement)
      .end((err, res) => {
        id = res.body.data.id;
        res.status.should.be.equal(201);
        res.body.status.should.be.equal('success');
        done();
      });
  });
  it('should not allow an admin to create an announcement', () => {
    chai.request(app)
      .post('/api/v2/announcement')
      .set('token', token.tokenAdmin)
      .send(announcement1)
      .end((err, res) => {
        res.status.should.be.equal(401);
        res.body.status.should.be.equal('error');
      });
  });
  it('should not allow wrong user to create announcement', () => {
    chai.request(app)
      .post('/api/v2/announcement')
      .set('token', wrongToken)
      .send(announcement1)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('user does not exist');
      });
  });
});
