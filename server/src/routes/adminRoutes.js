const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {verifyToken, requireAdmin} = require('../utils/authMiddleware');

// Election Routes
router.post('/elections',verifyToken, requireAdmin, adminController.createElection);
router.delete('/elections/:id', verifyToken, requireAdmin, adminController.deleteElection);

// Candidate Routes
router.post('/candidates', verifyToken, requireAdmin, adminController.addCandidate);
router.delete('/candidates/:id', verifyToken, requireAdmin, adminController.deleteCandidate);

// Voter Tracking
router.get('/voted-students', verifyToken, requireAdmin, adminController.getVotedStudents);
router.get('/non-voted-students', verifyToken, requireAdmin, adminController.getNonVotedStudents);

// Real-Time Results
router.get('/elections/:electionId/results', verifyToken, requireAdmin, adminController.getElectionResults);

module.exports = router;
