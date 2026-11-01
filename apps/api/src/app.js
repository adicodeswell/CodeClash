const express = require("express");
// cors
const cors = require("cors");

//middleware
const notFound = require("../middleware/notFound");
const errorHandler = require("../middleware/errorHandler");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Code Clash API is running",
  });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;