const express = require('express');
const router = express.Router();
const database = require('../Config/database');

// Route to fetch departments
router.get('/', (req, res) => {
  const query = 'SELECT id, name FROM department WHERE status = "active"';
  database.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching departments' });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
