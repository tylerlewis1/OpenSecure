const router = require('express').Router();
const loginHandler = require('./auth/login.js');
const stateSender = require('./state/startSSE.js');

router.post("/login", loginHandler);
router.get("/events", stateSender);
module.exports = router;