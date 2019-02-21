const request = require('supertest');
const server = require('./messagesRouter');
const db = require('../dbConfig');

// beforeEach(() => db.migrate.latest());
// afterEach(() => db('messages').truncate());

describe('messages table endpoints', () => {
  //   describe('/get endpoint', () => {
  //     it('should return status 404 when there are no messages yet', async () => {
  //       const message = {
  //         fullname: 'jorge osto',
  //         timestamp: 'asfasfdag',
  //         email: 'asdfnfhasfhf',
  //         message: 'asdfasfasfjasjfjasfja'
  //       };
  //       await request(server)
  //         .post('/')
  //         .send(message);
  //       const response = await request(server).get('/');
  //       expect(response.status).toBe(404);
  //     });
  //   });
});
