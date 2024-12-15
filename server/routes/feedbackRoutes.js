const express = require('express');
const { addFeedback } = require('../controllers/feedbackController');

const router = express.Router();

// Route to add feedback
router.post('/add-feedback', addFeedback);

module.exports = router;
