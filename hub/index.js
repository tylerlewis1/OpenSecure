const startBroker = require('./services/broker');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const path = require('path');

const frontendPath = path.join(__dirname, '../../dashboard/dist');

dotenv.config();

const app = express();
if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: `${process.env.HOST}${process.env.DEV_PORT}`,
        credentials: true                
    }));
} else {
    app.use(cors({
        origin: `${process.env.HOST}${process.env.PORT}`,
        credentials: true                
    }));
}


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

