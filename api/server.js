const express = require('express');
const db = require('../dbConfig');
const cors = require('cors');
const helmet = require('helmet');
const postsRouter = require('../routers/postsRouter');
const commentsRouter = require('../routers/commentsRouter');

const server = express();
server.use(express.json(), helmet(), cors());
server.use('/posts', postsRouter);
server.use('/comments', commentsRouter);

module.exports = server;
