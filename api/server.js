require('dotenv').config();

const express = require('express');
const db = require('../dbConfig');
const cors = require('cors');
const helmet = require('helmet');
const postsRouter = require('../routers/postsRouter');
const commentsRouter = require('../routers/commentsRouter');
const messagesRouter = require('../routers/messagesRouter');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isValidEmail, isValidPassword } = require('../middlewares/middleware');

const server = express();
server.use(
  express.json({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  cors(),
  helmet()
);
// server.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
//   );
//   next();
// });

server.use('/posts', postsRouter);
server.use('/comments', commentsRouter);
server.use('/messages', messagesRouter);

const secret = process.env.JWT_SECRET_KEY;

const generateToken = user => {
  const { Firstname, Lastname, username, admin, avatar, id } = user;
  const payload = {
    Firstname,
    Lastname,
    username,
    admin,
    avatar,
    id
  };
  const options = {
    expiresIn: '1h',
    jwtid: bcrypt.hashSync(user.username, 4),
    subject: `${id}`
  };
  return jwt.sign(payload, secret, options);
};

server.post('/register', isValidPassword, isValidEmail, (req, res) => {
  const creds = req.body;
  if (
    !creds.password ||
    !creds.username ||
    !creds.Firstname ||
    !creds.Lastname ||
    !creds.email
  ) {
    res.status(400).json({ error: 'All fields are required!' });
  }
  creds.password = bcrypt.hashSync(creds.password, 12);
  db('users')
    .insert(creds)
    .then(ids => {
      db('users')
        .where('id', ids[0])
        .first()
        .then(user => res.status(201).json(generateToken(user)));
    })
    .catch(err => res.status(500).json(err));
});

server.post('/login', (req, res) => {
  const creds = req.body;
  if (!creds.username || !creds.password) {
    res
      .status(400)
      .json({ message: 'Username and Password are both required!' });
  }
  db('users')
    .where('username', creds.username)
    .first()
    .then(user =>
      user && bcrypt.compareSync(creds.password, user.password)
        ? res.json(generateToken(user))
        : res.status(401).json({ message: 'Invalid username or password!' })
    )
    .catch(err => res.status(500).json(err));
});

server.put('/edit/:id', isValidPassword, isValidEmail, (req, res) => {
  const { id } = req.params;
  const user = req.body;
  db('users')
    .where('id', id)
    .update(user)
    .then(count =>
      !count
        ? res
            .status(404)
            .json({ message: 'There is no user with the specified ID!' })
        : res.json(count)
    )
    .catch(err => res.status(500).json(err));
});

module.exports = server;
