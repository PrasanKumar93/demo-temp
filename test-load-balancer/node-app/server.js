"use strict";

const express = require("express");
var cors = require("cors");

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

// App
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send(
    '<h1 style="color:red;">Testing Jode JS with AWS CI/CD Integration</h1> \n'
  );
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
