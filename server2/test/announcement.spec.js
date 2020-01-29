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
  it('should not create announcement if not logged in', () => {
    chai.request(app)
      .post('/api/v1/announcement')
      .send(announcement)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.status.should.be.equal('error');
      });
  });
  it('should create announcement with valid inputs', () => {
    chai.request(app)
      .post('/api/v1/announcement')
      .set('token', token.token)
      .send(announcement2)
      .end((err, res) => {
        res.status.should.be.equal(400);
      });
  });
  it('should allow an advertiser to create announcement', () => {
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
  it('should not allow an admin to create an announcement', () => {
    chai.request(app)
      .post('/api/v1/announcement')
      .set('token', token.tokenAdmin)
      .send(announcement1)
      .end((err, res) => {
        res.status.should.be.equal(401);
        res.body.status.should.be.equal('error');
      });
  });
  it('should not allow wrong user to create announcement', () => {
    chai.request(app)
      .post('/api/v1/announcement')
      .set('token', wrongToken)
      .send(announcement1)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('user does not exist');
      });
  });
  it('should not allow wrong user to update announcement', () => {
    chai.request(app)
      .patch(`/api/v1/announcement/${id}`)
      .set('token', wrongToken)
      .send(announcement1)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('user does not exist');
      });
  });
  it('should not allow user to update announcement of others', () => {
    chai.request(app)
      .patch(`/api/v1/announcement/${id}`)
      .set('token', token.token2)
      .send(announcement)
      .end((err, res) => {
        res.body.error.should.be.equal('You are not the owner');
      });
  });
  it('should not allow to update announcement that does not exist', () => {
    chai.request(app)
      .patch('/api/v1/announcement/5')
      .set('token', token.token)
      .send(announcement)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('Announcement does not exist');
      });
  });
  it('should not allow admin to update announcement details ', () => {
    chai.request(app)
      .patch(`/api/v1/announcement/${id}`)
      .set('token', token.tokenAdmin)
      .send(announcement)
      .end((err, res) => {
        res.status.should.be.equal(401);
        res.body.error.should.be.equal('You are not advertiser');
      });
  });

  it('should allow an advertiser to update announcement', () => {
    chai.request(app)
      .patch('/api/v1/announcement/4')
      .set('token', token.token)
      .send(announcement)
      .end((err, res) => {
        res.body.status.should.be.equal('success');
        res.status.should.be.equal(200);
      });
  });

  it('should allow an admin to update announcement status', () => {
    chai.request(app)
      .patch('/api/v1/announcement/4/sold')
      .set('token', token.tokenAdmin)
      .send(announcement)
      .end((err, res) => {
        res.body.status.should.be.equal('success');
        res.status.should.be.equal(200);
      });
  });

  it('should allow an admin to update exist announcement status', () => {
    chai.request(app)
      .patch('/api/v1/announcement/5/sold')
      .set('token', token.tokenAdmin)
      .send(announcement)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('Announcement does not exist');
      });
  });
  it('should not allow an advertiser to update announcement status', () => {
    chai.request(app)
      .patch(`/api/v1/announcement/${id}/sold`)
      .set('token', token.token)
      .send(announcement)
      .end((err, res) => {
        res.body.error.should.be.equal('You are not admin');
      });
  });
  it('should not allow a wrong user to update announcement status', () => {
    chai.request(app)
      .patch(`/api/v1/announcement/${id}/sold`)
      .set('token', wrongToken)
      .send(announcement)
      .end((err, res) => {
        res.body.status.should.be.equal('error');
        res.body.error.should.be.equal('user does not exist');
      });
  });
  it('should allow a user to view announcement details', () => {
    chai.request(app)
      .get(`/api/v1/announcement/${id}`)
      .set('token', token.token)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('success');
        res.status.should.be.equal(200);
      });
  });
  it('should not allow a wrong user to view announcement details', () => {
    chai.request(app)
      .get(`/api/v1/announcement/${id}`)
      .set('token', wrongToken)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('error');
        res.status.should.be.equal(403);
      });
  });
  it('should allow a user to view exist announcement details', () => {
    chai.request(app)
      .get('/api/v1/announcement/11')
      .set('token', token.token)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('error');
        res.status.should.be.equal(403);
      });
  });

  it('should allow a user to view announcement details based on status', () => {
    chai.request(app)
      .get('/api/v1/announcement/status?status=active')
      .set('token', token.token)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('success');
        res.status.should.be.equal(200);
      });
  });
  it('should not allow a wrong user to view announcement details based on status', () => {
    chai.request(app)
      .get('/api/v1/announcement/status?status=active')
      .set('token', wrongToken)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('error');
        res.status.should.be.equal(403);
      });
  });
  it('should allow a user to view announcement details based on status', () => {
    chai.request(app)
      .get('/api/v1/announcement/status?status=pending')
      .set('token', token.token)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('error');
        res.status.should.be.equal(403);
      });
  });

  it('should allow a user to view all announcements', () => {
    chai.request(app)
      .get('/api/v1/announcement/announcements')
      .set('token', token.token)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('success');
      });
  });

  it('should not allow a wrong user to view all announcements', () => {
    chai.request(app)
      .get('/api/v1/announcement/announcements')
      .set('token', wrongToken)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('error');
      });
  });

  it('should allow an advertiser to view all his announcements', () => {
    chai.request(app)
      .get('/api/v1/announcement/myannouncements')
      .set('token', token.token)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('success');
      });
  });
  it('should allow an advertiser to know when He created no announcements', () => {
    chai.request(app)
      .get('/api/v1/announcement/myannouncements')
      .set('token', token.token2)
      .send()
      .end((err, res) => {
        res.body.error.should.be.equal('you created no announcements');
      });
  });
  it('should not allow an advertiser to delete announcement ', () => {
    chai.request(app)
      .delete('/api/v1/announcement/3')
      .set('token', token.token)
      .send()
      .end((err, res) => {
        res.status.should.be.equal(401);
        res.body.error.should.be.equal('You are not admin');
      });
  });

  it('should not allow a wrong user to delete announcement', () => {
    chai.request(app)
      .delete('/api/v1/announcement/3')
      .set('token', wrongToken)
      .send()
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('user does not exist');
      });
  });

  it('should allow an admin to delete exist announcement', () => {
    chai.request(app)
      .delete('/api/v1/announcement/9')
      .set('token', token.tokenAdmin)
      .send()
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('Announcement does not exist');
      });
  });

  it('should allow an admin to delete announcement', () => {
    chai.request(app)
      .delete('/api/v1/announcement/4')
      .set('token', token.tokenAdmin)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('success');
      });
  });
});
