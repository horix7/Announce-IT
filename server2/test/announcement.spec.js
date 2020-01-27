import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import token from './auth.spec';
import tokenHelper from '../src/helpers/token';

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
const announcement3={
  text: 'you should pay schoolfees',
  startDate: '2020-01-15T22:55:44.356Z',
  endDate: '2020-06-10T22:55:44.356Z',
}
const wrongToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1a2lAZ21haWwuY29tIiwiaWQiOjE4NDEsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE1Nzk4MTcxNjh9.1u-ZdPxLjeImFinFx2vJQC1dfiMsiVTAzRjvnFfV1P4';

describe('announcement test', () => {
  let id;
  it('not logged in', () => {
    chai.request(app)
      .post('/api/v1/announcement')
      .send(announcement)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.status.should.be.equal('error');
      });
  });
  it('not valid input', () => {
    chai.request(app)
      .post('/api/v1/announcement')
      .set('token', token.token)
      .send(announcement2)
      .end((err, res) => {
        res.status.should.be.equal(400);
      });
  });
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
  it('user does not exist update', () => {
    chai.request(app)
      .patch(`/api/v1/announcement/${id}`)
      .set('token', wrongToken)
      .send(announcement1)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('user does not exist');
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
  it('announcement not exist', () => {
    chai.request(app)
      .patch('/api/v1/announcement/5')
      .set('token', token.token)
      .send(announcement)
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('Announcement does not exist');
      });
  });
  it('you are not advertiser', () => {
    chai.request(app)
      .patch(`/api/v1/announcement/${id}`)
      .set('token', token.tokenAdmin)
      .send(announcement)
      .end((err, res) => {
        res.status.should.be.equal(401);
        res.body.error.should.be.equal('You are not advertiser');
      });
  });

  it('announcement update', () => {
    chai.request(app)
      .patch('/api/v1/announcement/4')
      .set('token', token.token)
      .send(announcement)
      .end((err, res) => {

        res.body.status.should.be.equal('success');
        res.status.should.be.equal(200);
      });
  });
    it('announcement update', () => {
    chai.request(app)
      .patch('/api/v1/announcement/4')
      .set('token', token.token)
      .send(announcement)
      .end((err, res) => {

        res.body.status.should.be.equal('success');
        res.status.should.be.equal(200);
      });
  });

  it('announcement update', () => {
    chai.request(app)
      .patch('/api/v1/announcement/4/sold')
      .set('token', token.tokenAdmin)
      .send(announcement)
      .end((err, res) => {
        res.body.status.should.be.equal('success');
        res.status.should.be.equal(200);
      });
  });
  
  it('announcement not exist admin', () => {
    chai.request(app)
      .patch('/api/v1/announcement/5/sold')
      .set('token', token.tokenAdmin)
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
  it('not user', () => {
    chai.request(app)
      .patch(`/api/v1/announcement/${id}/sold`)
      .set('token', wrongToken)
      .send(announcement)
      .end((err, res) => {
        res.body.status.should.be.equal('error');
        res.body.error.should.be.equal('user does not exist');
      });
  });
  it('announcement', () => {
    chai.request(app)
      .get(`/api/v1/announcement/${id}`)
      .set('token', token.token)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('success');
        res.status.should.be.equal(200);
      });
  });
  it('not user announcement', () => {
    chai.request(app)
      .get(`/api/v1/announcement/${id}`)
      .set('token', wrongToken)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('error');
        res.status.should.be.equal(403);
      });
  });
  it('announcement not exist', () => {
    chai.request(app)
      .get('/api/v1/announcement/11')
      .set('token', token.token)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('error');
        res.status.should.be.equal(403);
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

  it('not user announcements', () => {
    chai.request(app)
      .get('/api/v1/announcement/announcements')
      .set('token', wrongToken)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('error');
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
  it('no myannouncements', () => {
    chai.request(app)
      .get('/api/v1/announcement/myannouncements')
      .set('token', token.token2)
      .send()
      .end((err, res) => {
        res.body.error.should.be.equal('you created no announcements');
      });
  });
  it('not admin delete', () => {
    chai.request(app)
      .delete('/api/v1/announcement/3')
      .set('token', token.token)
      .send()
      .end((err, res) => {
        res.status.should.be.equal(401);
        res.body.error.should.be.equal('You are not admin');
      });
  });

  it('not user delete', () => {
    chai.request(app)
      .delete('/api/v1/announcement/3')
      .set('token', wrongToken)
      .send()
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('user does not exist');
      });
  });

  it('announcement not exist delete', () => {
    chai.request(app)
      .delete('/api/v1/announcement/9')
      .set('token', token.tokenAdmin)
      .send()
      .end((err, res) => {
        res.status.should.be.equal(403);
        res.body.error.should.be.equal('Announcement does not exist');
      });
  });
  
  it('delete', () => {
    chai.request(app)
      .delete('/api/v1/announcement/4')
      .set('token', token.tokenAdmin)
      .send()
      .end((err, res) => {
        res.body.status.should.be.equal('success');
      });
  });
});
