require("dotenv").config();
const server = require("./api/server");

const port = process.env.PORT || 9000;

server.get("/", (req, res) => {
  res.send("<h1>server running</h1>");
});

server.listen(port, () => console.log(`api running on port ${port}...`));
