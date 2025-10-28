const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    name: 'proyecto_final',
    env: process.env.NODE_ENV || 'dev'
  });
});

module.exports = router;
