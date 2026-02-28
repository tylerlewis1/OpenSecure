const startBroker = require('./services/broker');
const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`Hub is on port ${process.env.PORT}`);
});

app.get("/status", (req, res) => {
  res.send("OpenSecure Hub is running!");
});


startBroker();

app.use(express.json());