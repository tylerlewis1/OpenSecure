const router = require('express').Router();
const loginHandler = require('./auth/login.js');
const stateSender = require('./state/startSSE.js');
const armHandler = require('./state/arm.js');

router.post("/login", loginHandler);
router.get("/events", stateSender);
router.post("/arm", armHandler);

module.exports = router;