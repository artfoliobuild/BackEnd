require("dotenv").config();
const express = require("express");
const server = express();

const port = process.env.PORT || 9000;

server.get("/", (req, res) => {
  res.send("<h1>server running</h1>");
});

// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 8000;
// }
// app.listen(port);

server.listen(port, () => console.log(`api running on port ${port}...`));

