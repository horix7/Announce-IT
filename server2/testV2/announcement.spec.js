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
  it('should not allow an admin to create an announcement', (done) => {
    chai.request(app)
      .post('/api/v2/announcement')
      .set('token', token.tokenAdmin)
      .send(announcement1)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.status.should.be.equal('error');
        done();
      });
  });
  it('should not allow wrong user to create announcement', (done) => {
    chai.request(app)
      .post('/api/v2/announcement')
      .set('token', wrongToken)
      .send(announcement1)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('User does not exist');
        done();
      });
  });
  it('should not allow wrong user to update announcement', (done) => {
    chai.request(app)
      .patch(`/api/v2/announcement/${id}`)
      .set('token', wrongToken)
      .send(announcement1)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('User does not exist');
        done();
      });
  });
  it('should not allow user to update announcement of others', (done) => {
    chai.request(app)
      .patch(`/api/v2/announcement/${id}`)
      .set('token', token.token2)
      .send(announcement)
      .end((err, res) => {
        res.body.error.should.be.equal('you are not the owner');
        done();
      });
  });
  it('should not allow to update announcement that does not exist', (done) => {
    chai.request(app)
      .patch('/api/v2/announcement/5')
      .set('token', token.token)
      .send(announcement)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('announcement does not exists');
        done();
      });
  });
  it('should not allow admin to update announcement details ', (done) => {
    chai.request(app)
      .patch(`/api/v2/announcement/${id}`)
      .set('token', token.tokenAdmin)
      .send(announcement)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('Not advertiser');
        done();
      });
  });

  it('should allow an advertiser to update announcement', (done) => {
    chai.request(app)
      .patch(`/api/v2/announcement/${id}`)
      .set('token', token.token)
      .send(announcement)
      .end((err, res) => {
        res.body.status.should.be.equal('success');
        res.status.should.be.equal(200);
        done();
      });
  });
  it('should allow an admin to update announcement status', (done) => {
    chai.request(app)
      .patch(`/api/v2/announcement/${id}/sold`)
      .set('token', token.tokenAdmin)
      .send(announcement)
      .end((err, res) => {
        res.body.status.should.be.equal('success');
        res.status.should.be.equal(200);
        done();
      });
  });

  it('should allow an admin to update exist announcement status', (done) => {
    chai.request(app)
      .patch('/api/v2/announcement/5/sold')
      .set('token', token.tokenAdmin)
      .send(announcement)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('announcement does not exists');
        done();
      });
  });
  it('should not allow an advertiser to update announcement status', (done) => {
    chai.request(app)
      .patch(`/api/v2/announcement/${id}/sold`)
      .set('token', token.token)
      .send(announcement)
      .end((err, res) => {
        res.body.error.should.be.equal('Not admin');
        done();
      });
  });
  it('should not allow a wrong user to update announcement status', (done) => {
    chai.request(app)
      .patch(`/api/v2/announcement/${id}/sold`)
      .set('token', wrongToken)
      .send(announcement)
      .end((err, res) => {
        res.body.status.should.be.equal('error');
        res.body.error.should.be.equal('User does not exist');
        done();
      });
  });
  it('should allow a user to view announcement details', (done) => {
    chai.request(app)
      .get(`/api/v2/announcement/${id}`)
      .set('token', token.token)
      .end((err, res) => {
        res.body.status.should.be.equal('success');
        res.status.should.be.equal(200);
        done();
      });
  });
  it('should allow a user to view all announcements', (done) => {
    chai.request(app)
      .get('/api/v2/announcement/announcements')
      .set('token', token.token)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('success');
        res.status.should.be.equal(200);
        done();
      });
  });
  it('should not allow a wrong user to view announcement details', (done) => {
    chai.request(app)
      .get(`/api/v2/announcement/${id}`)
      .set('token', wrongToken)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('error');
        res.status.should.be.equal(403);
        done();
      });
  });

  it('should not allow a wrong user to view all announcements', (done) => {
    chai.request(app)
      .get('/api/v2/announcement/announcements')
      .set('token', wrongToken)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('error');
        res.status.should.be.equal(403);
        done();
      });
  });
  it('should allow a user to view exist announcement details', (done) => {
    chai.request(app)
      .get('/api/v2/announcement/11')
      .set('token', token.token)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('error');
        res.status.should.be.equal(403);
        done();
      });
  });
  it('should allow an advertiser to view all his announcements', (done) => {
    chai.request(app)
      .get('/api/v2/announcement/myannouncements')
      .set('token', token.token)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('success');
        done();
      });
  });
  it('should allow an advertiser to know when He created no announcements', (done) => {
    chai.request(app)
      .get('/api/v2/announcement/myannouncements')
      .set('token', token.token2)
      .send()
      .end((err, res) => {
        res.body.error.should.be.equal('you created no announcements');
        done();
      });
  });
  it('should not allow admin to know his announcements as he created none', (done) => {
    chai.request(app)
      .get('/api/v2/announcement/myannouncements')
      .set('token', token.tokenAdmin)
      .send()
      .end((err, res) => {
        res.body.error.should.be.equal('Not advertiser');
        done();
      });
  });
  it('should allow a user to view announcement details based on status', (done) => {
    chai.request(app)
      .get('/api/v2/announcement/status?status=accepted')
      .set('token', token.token)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('success');
        res.status.should.be.equal(200);
        done();
      });
  });
  it('should not allow a wrong user to view announcement details based on status', (done) => {
    chai.request(app)
      .get('/api/v2/announcement/status?status=active')
      .set('token', wrongToken)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('error');
        res.status.should.be.equal(403);
        done();
      });
  });
  it('should allow a user to view announcement details based on status', (done) => {
    chai.request(app)
      .get('/api/v2/announcement/status?status=pending')
      .set('token', token.token)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('error');
        res.status.should.be.equal(403);
        done();
      });
  });
});
