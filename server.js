// link to github -> https://github.com/EvelinaPyechkurova/restful-service
require("./config/db");
const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;

const server = express();
server.listen(PORT, () => `Server listening on port ${PORT}`);
