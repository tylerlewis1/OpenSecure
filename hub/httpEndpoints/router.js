const router = require('express').Router();


router.post("/login", (req, res) => {
    console.log("Login endpoint hit with body:", req.body);
});

module.exports = router;