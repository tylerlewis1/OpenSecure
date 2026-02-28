const router = require('express').Router();


router.get("/dwa", (req, res) => {
    res.sendFile(frontendPath);
});

module.exports = router;