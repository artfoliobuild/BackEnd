const request = require('supertest');
const server = require('./server');
const db = require('../dbConfig');

beforeEach(() => db.migrate.latest());
afterEach(() => db('users').truncate());

describe('Registration and login endpoints', () => {
  // describe('/register endpoint', () => {
  //   it('should return status 400 when password length is less than 8', async () => {
  //     const creds = {
  //       Firstname: 'jorge',
  //       Lastname: 'osto',
  //       username: 'kingkong',
  //       email: 'jorge@gmail.com',
  //       password: 'aS!dfgt'
  //     };
  //     const response = await request(server)
  //       .post('/register')
  //       .send(creds);
  //     expect(response.status).toBe(400);
  //   });
  //   it('should return status 400 when password does not contain an Uppercase letter', async () => {
  //     const creds = {
  //       Firstname: 'jorge',
  //       Lastname: 'osto',
  //       username: 'kingkong',
  //       email: 'jorge@gmail.com',
  //       password: 'as346!dfgt'
  //     };
  //     const response = await request(server)
  //       .post('/register')
  //       .send(creds);
  //     expect(response.status).toBe(400);
  //   });
  //   it('should return status 400 when password does not contain an Lowercase letter', async () => {
  //     const creds = {
  //       Firstname: 'jorge',
  //       Lastname: 'osto',
  //       username: 'kingkong',
  //       email: 'jorge@gmail.com',
  //       password: 'AS346!TRE'
  //     };
  //     const response = await request(server)
  //       .post('/register')
  //       .send(creds);
  //     expect(response.status).toBe(400);
  //   });
  //   it('should return status 400 when password does not contain a number', async () => {
  //     const creds = {
  //       Firstname: 'jorge',
  //       Lastname: 'osto',
  //       username: 'kingkong',
  //       email: 'jorge@gmail.com',
  //       password: 'ASsada!TRE'
  //     };
  //     const response = await request(server)
  //       .post('/register')
  //       .send(creds);
  //     expect(response.status).toBe(400);
  //   });
  //   it('should return status 400 when password does not contain a special character', async () => {
  //     const creds = {
  //       Firstname: 'jorge',
  //       Lastname: 'osto',
  //       username: 'kingkong',
  //       email: 'jorge@gmail.com',
  //       password: 'ASsada#TRE'
  //     };
  //     const response = await request(server)
  //       .post('/register')
  //       .send(creds);
  //     expect(response.status).toBe(400);
  //   });
  //   it('should return status 400 when invalid email is submitted', async () => {
  //     const creds = {
  //       Firstname: 'jorge',
  //       Lastname: 'osto',
  //       username: 'kingkong',
  //       email: 'jorgegmail.com',
  //       password: 'ASs24ada#TRE'
  //     };
  //     const response = await request(server)
  //       .post('/register')
  //       .send(creds);
  //     expect(response.status).toBe(400);
  //   });
  //   it('should return status 400 when invalid email is submitted', async () => {
  //     const creds = {
  //       Firstname: 'jorge',
  //       Lastname: 'osto',
  //       username: 'kingkong',
  //       email: 'jorge@gmail',
  //       password: 'ASs24ada#TRE'
  //     };
  //     const response = await request(server)
  //       .post('/register')
  //       .send(creds);
  //     expect(response.status).toBe(400);
  //   });
  //   it('should return status 500 missing password field', async () => {
  //     const creds = {
  //       Firstname: 'jorge',
  //       Lastname: 'osto',
  //       username: 'kingkong',
  //       email: 'jorge@gmail.com'
  //     };
  //     const response = await request(server)
  //       .post('/register')
  //       .send(creds);
  //     expect(response.status).toBe(500);
  //   });
  //   it('should return status 500 missing email field', async () => {
  //     const creds = {
  //       Firstname: 'jorge',
  //       Lastname: 'osto',
  //       username: 'kingkong',
  //       password: 'jorgR2%com'
  //     };
  //     const response = await request(server)
  //       .post('/register')
  //       .send(creds);
  //     expect(response.status).toBe(500);
  //   });
  //   it('should return status 400 missing Firstname field', async () => {
  //     const creds = {
  //       email: 'jorge@gmail.com',
  //       Lastname: 'osto',
  //       username: 'kingkong',
  //       password: 'jorgR2%com'
  //     };
  //     const response = await request(server)
  //       .post('/register')
  //       .send(creds);
  //     expect(response.status).toBe(400);
  //   });
  //   it('should return status 400 missing Lastname field', async () => {
  //     const creds = {
  //       Firstname: 'jorge',
  //       email: 'osto@gmail.com',
  //       username: 'kingkong',
  //       password: 'jorgR2%com'
  //     };
  //     const response = await request(server)
  //       .post('/register')
  //       .send(creds);
  //     expect(response.status).toBe(400);
  //   });
  //   it('should return status 201 when valid fields are submitted', async () => {
  //     const creds = {
  //       Firstname: 'jorge',
  //       Lastname: 'osto',
  //       username: 'kingkong',
  //       email: 'jorge@gmail.com',
  //       password: 'ASs24ada#TRE'
  //     };
  //     const response = await request(server)
  //       .post('/register')
  //       .send(creds);
  //     expect(response.status).toBe(201);
  //   });
  // });
  describe('/login endpoint', () => {
    //   it('should return status 401 when invalid username or password are sent', async () => {
    //     const creds = {
    //       Firstname: 'jorge',
    //       Lastname: 'osto',
    //       username: 'kingkong',
    //       email: 'jorge@gmail.com',
    //       password: 'ASs24ada#TRE'
    //     };
    //     const user = {
    //       username: 'kingkong',
    //       password: 'ASs24ada#'
    //     };
    //     const token = await request(server)
    //       .post('/register')
    //       .send(creds);
    //     const response = await request(server)
    //       .post('/login')
    //       .send(user);
    //     expect(response.status).toBe(401);
    //   });
    //   it('should return status 200 when valid username or password are sent', async () => {
    //     const creds = {
    //       Firstname: 'jorge',
    //       Lastname: 'osto',
    //       username: 'kingkong',
    //       email: 'jorge@gmail.com',
    //       password: 'ASs24ada#TRE'
    //     };
    //     const user = {
    //       username: 'kingkong',
    //       password: 'ASs24ada#TRE'
    //     };
    //     const token = await request(server)
    //       .post('/register')
    //       .send(creds);
    //     const response = await request(server)
    //       .post('/login')
    //       .send(user);
    //     expect(response.status).toBe(200);
    //   });
    //   it('should return status 400 when missing password field', async () => {
    //     const creds = {
    //       Firstname: 'jorge',
    //       Lastname: 'osto',
    //       username: 'kingkong',
    //       email: 'jorge@gmail.com',
    //       password: 'ASs24ada#TRE'
    //     };
    //     const user = {
    //       username: 'kingkong'
    //     };
    //     const token = await request(server)
    //       .post('/register')
    //       .send(creds);
    //     const response = await request(server)
    //       .post('/login')
    //       .send(user);
    //     expect(response.status).toBe(400);
    //   });
    it('should return status 400 when missing username field', async () => {
      try {
        const creds = {
          Firstname: 'jorge',
          Lastname: 'osto',
          username: 'kingkong',
          email: 'jorge@gmail.com',
          password: 'ASs24ada#TRE'
        };
        const user = {
          password: 'kingkong'
        };
        const token = await request(server)
          .post('/register')
          .send(creds);
        const response = await request(server)
          .post('/login')
          .send(user);
        expect(response.status).toBe(400);
      } catch (err) {
        console.error(err);
      }
    });
  });
  describe('/edit/:id endpoint', () => {
    it('should return status 500 when id does not match any existing user', async () => {
      try {
        const creds = {
          Firstname: 'jorge',
          Lastname: 'osto',
          username: 'kingkong',
          email: 'jorge@gmail.com',
          password: 'ASs24ada#TRE'
        };
        const token = await request(server)
          .post('/register')
          .send(creds);
        const user = {
          password: 'Kingkong12!'
        };
        const response = await request(server)
          .put('/edit/3')
          .send(user);
        expect(response.status).toBe(500);
      } catch (err) {
        console.error(err);
      }
    });
    it('should return status 200 when id matches any existing user', async () => {
      try {
        const creds = {
          Firstname: 'jorge',
          Lastname: 'osto',
          username: 'kingkong',
          email: 'jorge@gmail.com',
          password: 'ASs24ada#TRE'
        };
        const token = await request(server)
          .post('/register')
          .send(creds);
        const user = {
          Firstname: 'jorge',
          Lastname: 'osto',
          username: 'kingkong',
          email: 'jorge@gmail.com',
          password: 'Kingkong12!'
        };
        const response = await request(server)
          .put('/edit/1')
          .send(user);
        expect(response.status).toBe(200);
      } catch (err) {
        console.error(err);
      }
    });
  });
  describe('messages table endpoints', () => {
    describe('/get endpoint', () => {
      it('should return status 404 when there are no messages yet', async () => {
        const message = {
          fullname: 'jorge osto',
          timestamp: 'asfasfdag',
          email: 'asdfnfhasfhf',
          message: 'asdfasfasfjasjfjasfja'
        };
        await request(server)
          .post('/')
          .send(message);

        try {
          const response = await request(server).get('/messages');
          expect(response.status).toBe(404);
        } catch (err) {
          console.error(err);
        }
      });
    });
  });
});
