const router = require('express').Router();
const loginHandler = require('./auth/login.js');

router.post("/login", loginHandler);

module.exports = router;