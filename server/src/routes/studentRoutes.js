const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const {verifyToken, requireStudent} = require('../utils/authMiddleware');
const {voteSchema} = require('../validator/voteSchema');
const {validate} = require('../utils/validate');


router.post('/vote', verifyToken, requireStudent, validate(voteSchema),studentController.vote);
router.get('/vote-status', verifyToken, requireStudent, studentController.getVoteStatus);

module.exports = router;
