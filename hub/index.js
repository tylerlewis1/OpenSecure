const startBroker = require('./services/broker');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

const frontendPath = __dirname + "../../dashboard/dist";

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // MUST match your frontend URL exactly
    credentials: true                
}));

app.use(express.json());


app.listen(process.env.PORT, () => {
  console.log(`Hub is on port ${process.env.PORT}`);
});

app.use(express.static(frontendPath));

app.use("/api", require('./httpEndpoints/router'));

app.get("/status", (req, res) => {
  res.send("OpenSecure Hub is running!");
});


startBroker();

