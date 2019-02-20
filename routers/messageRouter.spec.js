const request = require('supertest');
const server = require('./messagesRouter');
const db = require('../dbConfig');

beforeEach(() => db.migrate.latest());
afterEach(() => db('messages').truncate());

describe('messages table endpoints', () => {
  describe('/get endpoint', () => {
    it('should return status 404 when there are no messages yet', async () => {
      const response = await request(server).get('/messages');
      expect(response.status).toBe(404);
    });
  });
});
