// link to github -> https://github.com/EvelinaPyechkurova/restful-service
require("./config/db");
const express = require("express");
require("dotenv").config();
const teacherRoutes = require("./routes/teacherRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const lectureRoutes = require("./routes/lectureRoutes");

const PORT = process.env.PORT;

const server = express();

server.use(express.json());

server.use("/teachers", teacherRoutes);
server.use("/subjects", subjectRoutes);
server.use("/lectures", lectureRoutes);

server.listen(PORT, () => `Server listening on port ${PORT}`);