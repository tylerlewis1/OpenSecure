const startBroker = require('./services/broker');
const dotenv = require('dotenv');
const express = require('express');
dotenv.config();

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Hub is on port ${process.env.PORT}`);
});

app.use("/", require('./httpEndpoints/router'));

app.get("/status", (req, res) => {
  res.send("OpenSecure Hub is running!");
});


startBroker();

app.use(express.json());