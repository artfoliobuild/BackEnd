const express = require('express');
const db = require('../dbConfig');
const cors = require('cors');
const helmet = require('helmet');
const postsRouter = require('../routers/postsRouter');
const commentsRouter = require('../routers/commentsRouter');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const server = express();
server.use(express.json(), cors(), helmet());
server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', false);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
  );
  next();
});

server.use('/posts', postsRouter);
server.use('/comments', commentsRouter);

const secret = 'This is not my secret!';

const generateToken = user => {
  const { username, admin } = user;
  const payload = {
    username,
    admin
  };
  const options = {
    expiresIn: '1h',
    jwtid: bcrypt.hashSync(user.username, 4),
    subject: `${user.id}`
  };
  return jwt.sign(payload, secret, options);
};

const protectRoute = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    jwt.verify(token, secret, (err, decodedToken) => {
      err ? res.status(401).json({ message: 'Invalid token!' }) : next();
    });
  } else {
    res.status(403).json({ error: 'FORBIDDEN!!!' });
  }
};

server.post('/register', (req, res) => {
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
        .then(user => {
          const { username, admin } = user;
          res.status(201).json({ username, admin, token: generateToken(user) });
        });
    })
    .catch(err => res.status(500).json(err));
});

server.post('/login', (req, res) => {
  const creds = req.body;
  db('users')
    .where('username', creds.username)
    .first()
    .then(user =>
      user && bcrypt.compareSync(creds.password, user.password)
        ? res.json({
            username: user.username,
            admin: user.admin,
            token: generateToken(user)
          })
        : res.status(401).json({ message: 'Invalid username or password!' })
    )
    .catch(err => res.status(500).json(err));
});

module.exports = server;
