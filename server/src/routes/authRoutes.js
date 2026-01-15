const express = require('express');
const router = express.Router();


router.post('/login', (req, res) => res.json({ msg: "Login path ok" }));
router.post('/register', (req, res) => res.json({ msg: "Register path ok" }));

module.exports = router;