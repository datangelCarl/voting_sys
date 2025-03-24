const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {verifyToken, requireAdmin} = require('../utils/authMiddleware');
const {validate} = require('../utils/validate');
const { collegeSchema, departmentSchema } = require('../validator/adminValidation');


router.post('/college', verifyToken, requireAdmin, validate(collegeSchema), adminController.createCollege);
router.delete('/college/:id', verifyToken, requireAdmin, adminController.deleteCollege);

router.post('/department', verifyToken, requireAdmin, validate(departmentSchema), adminController.createDepartment);
router.delete('/department/:id', verifyToken, requireAdmin, adminController.deleteDepartment);


router.post('/elections',verifyToken, requireAdmin, adminController.createElection);
router.delete('/elections/:id', verifyToken, requireAdmin, adminController.deleteElection);


router.post('/candidates', verifyToken, requireAdmin, adminController.addCandidate);
router.delete('/candidates/:id', verifyToken, requireAdmin, adminController.deleteCandidate);


router.get('/voted-students', verifyToken, requireAdmin, adminController.getVotedStudents);
router.get('/non-voted-students', verifyToken, requireAdmin, adminController.getNonVotedStudents);


router.get('/elections/:electionId/results', verifyToken, requireAdmin, adminController.getElectionResults);

module.exports = router;
