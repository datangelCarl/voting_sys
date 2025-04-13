const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, requireAdmin } = require('../utils/authMiddleware');
const { validate } = require('../utils/validate');
const { collegeSchema, departmentSchema, loginSchema } = require('../validator/adminValidation');


router.post('/login', validate(loginSchema), adminController.login);

// College routes
router.post('/college', verifyToken, requireAdmin, validate(collegeSchema), adminController.createCollege);
router.delete('/college/:id', verifyToken, requireAdmin, adminController.deleteCollege);
router.get('/college',verifyToken, requireAdmin, adminController.getColleges); // <-- added

// Department routes
router.post('/department', verifyToken, requireAdmin, validate(departmentSchema), adminController.createDepartment);
router.delete('/department/:id', verifyToken, requireAdmin, adminController.deleteDepartment);
router.get('/department/:collegeId', adminController.getDepartments); // <-- added

// Election routes
router.post('/elections', verifyToken, requireAdmin, adminController.createElection);
router.delete('/elections/:id', verifyToken, requireAdmin, adminController.deleteElection);
router.get('/elections/:electionId/results', verifyToken, requireAdmin, adminController.getElectionResults);

// Candidate routes
router.post('/candidates', verifyToken, requireAdmin, adminController.addCandidate);
router.delete('/candidates/:id', verifyToken, requireAdmin, adminController.deleteCandidate);

// Voting info routes
router.get('/voted-students', verifyToken, requireAdmin, adminController.getVotedStudents);
router.get('/non-voted-students', verifyToken, requireAdmin, adminController.getNonVotedStudents);

module.exports = router;
