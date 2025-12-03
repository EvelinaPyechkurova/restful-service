require("./config/db");
const express = require("express");
require("dotenv").config();
const cors = require('cors');


const teacherRoutes = require("./routes/teacherRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const lectureRoutes = require("./routes/lectureRoutes");

const PORT = process.env.PORT;

const server = express();

server.use(cors(
    { 
        origin: `http://localhost:${FRONTEND_CLIENT_PORT}`
    }
));
server.use(express.json());

server.use("/teachers", teacherRoutes);
server.use("/subjects", subjectRoutes);
server.use("/lectures", lectureRoutes);

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));