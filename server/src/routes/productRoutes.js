const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json([]));

// CRITICAL: Must export
module.exports = router;