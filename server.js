const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = 3000;

const jwt = require("jsonwebtoken");
const User = require("./domains/users/userModel");

require("dotenv").config();

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// const routes = require("./domains/users/v1/api");
// app.use("/api", routes);

const ConnectMongoDB = require("./ConnectMongoDB");
ConnectMongoDB();

const authRoutes = require("./routes/users/auth");
app.use(authRoutes);
