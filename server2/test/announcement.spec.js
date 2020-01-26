import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import token from './auth.spec';

chai.should();

chai.use(chaiHttp);
const announcement = {
  id: 300,
  status: 'accepted',
  text: 'you should pay schoolfees',
  start_date: '2020-01-15T22:55:44.356Z',
  end_date: '2020-06-10T22:55:44.356Z',
};
const announcement1 = {
  id: 301,
  status: 'active',
  text: 'you should pay schoolfees',
  start_date: '2020-01-15T22:55:44.356Z',
  end_date: '2020-06-10T22:55:44.356Z',
};
const wrongToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1a2lAZ21haWwuY29tIiwiaWQiOjE4NDEsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE1Nzk4MTcxNjh9.1u-ZdPxLjeImFinFx2vJQC1dfiMsiVTAzRjvnFfV1P4';

describe('announcement test', () => {
  let id;
  it('create announcement', () => {
    chai.request(app)
      .post('/api/v1/announcement')
      .set('token', token.token)
      .send(announcement)
      .end((err, res) => {
        id = res.body.data.id;
        res.status.should.be.equal(201);
        res.body.status.should.be.equal('success');
      });
  });
  it('not advertiser', () => {
    chai.request(app)
      .post('/api/v1/announcement')
      .set('token', token.tokenAdmin)
      .send(announcement1)
      .end((err, res) => {
        res.status.should.be.equal(401);
        res.body.status.should.be.equal('error');
      });
  });
  it('announcement exist', () => {
    chai.request(app)
      .post('/api/v1/announcement')
      .set('token', token.token)
      .send(announcement)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('announcement exists');
      });
  });
  it('not owner', () => {
    chai.request(app)
      .patch(`/api/v1/announcement/${id}`)
      .set('token', token.token2)
      .send(announcement)
      .end((err, res) => {
        res.body.error.should.be.equal('You are not the owner');
      });
  });
  it('user does not exist', () => {
    chai.request(app)
      .post('/api/v1/announcement')
      .set('token', wrongToken)
      .send(announcement1)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('user does not exist');
      });
  });
  it('announcement not exist', () => {
    chai.request(app)
      .patch('/api/v1/announcement/301')
      .set('token', token.token)
      .send(announcement)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('Announcement does not exist');
      });
  });

  it('not admin', () => {
    chai.request(app)
      .patch(`/api/v1/announcement/${id}/sold`)
      .set('token', token.token)
      .send(announcement)
      .end((err, res) => {
        res.body.error.should.be.equal('You are not admin');
      });
  });
  it('you are not advertiser', () => {
    chai.request(app)
      .patch('/api/v1/announcement/300')
      .set('token', token.tokenAdmin)
      .send(announcement)
      .end((err, res) => {
        res.status.should.be.equal(401);
        res.body.error.should.be.equal('You are not advertiser');
      });
  });
  it('announcement', () => {
    chai.request(app)
      .get('/api/v1/announcement/300')
      .set('token', token.token)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('success');
      });
  });
  it('announcements', () => {
    chai.request(app)
      .get('/api/v1/announcement/announcements')
      .set('token', token.token)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('success');
      });
  });
  it('myannouncements', () => {
    chai.request(app)
      .get('/api/v1/announcement/myannouncements')
      .set('token', token.token)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('success');
      });
  });
  it('delete', () => {
    chai.request(app)
      .delete('/api/v1/announcement/300')
      .set('token', token.tokenAdmin)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('success');
      });
  });
});
