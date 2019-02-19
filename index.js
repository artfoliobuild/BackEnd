// require('dotenv').config();
const server = require('./api/server');

const PORT = process.env.SERVER_PORT;

server.get('/', (req, res) => {
  res.send('<h1>server running</h1>');
});

server.listen(PORT, console.log(`Server is up and running on port ${PORT}!`));
