const router = require('express').Router();


router.get("/", (req, res) => {
    res.send("Welcome to OpenSecure Hub!");
});

module.exports = router;