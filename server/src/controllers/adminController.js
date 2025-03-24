const Candidate = require('../schemas/candidateSchema');
const Election = require('../schemas/electionSchema');
const User = require('../schemas/userSchema');
const Vote = require('../schemas/voteSchema');
const College = require('../schemas/collegeSchema');

//create College
exports.createCollege = async (req, res) => {
  try {
    const { name } = req.body;
    const college = new College({ name });
    await college.save();
    res.status(201).json({ message: 'College created', college });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//delete College
exports.deleteCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await College.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'College not found' });
    res.status(200).json({ message: 'College deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//create department
const Department = require('../schemas/departmentSchema');

exports.createDepartment = async (req, res) => {
  try {
    const { name, collegeId } = req.body;

    const department = new Department({ name, college: collegeId });
    await department.save();

    res.status(201).json({ message: 'Department created', department });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//delete department
exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Department.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Department not found' });
    res.status(200).json({ message: 'Department deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Create Election
exports.createElection = async (req, res) => {
    try {
      const { name, position, collegeId, departmentId, startDate, endDate } = req.body;
  
      const election = new Election({
        name,
        position,
        college: collegeId,
        department: departmentId,
        startDate,
        endDate,
        status: 'upcoming',
      });      
  
      await election.save();
  
      res.status(201).json({ message: 'Election created successfully', election });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Delete Election
  exports.deleteElection = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedElection = await Election.findByIdAndDelete(id);
      if (!deletedElection) {
        return res.status(404).json({ message: 'Election not found' });
      }
  
      res.status(200).json({ message: 'Election deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
// Add Candidate
exports.addCandidate = async (req, res) => {
  try {
    const { firstName, lastName, position, electionId } = req.body;

    // Validate Election
    const election = await Election.findById(electionId);
    if (!election) return res.status(404).json({ message: 'Election not found' });

    // Use the college and department from the election
    const collegeId = election.college;
    const departmentId = election.department;

    // Optionally, validate if college and department exist (if needed)
    const college = await College.findById(collegeId);
    if (!college) return res.status(404).json({ message: 'College not found (from election)' });

    const department = await Department.findById(departmentId);
    if (!department) return res.status(404).json({ message: 'Department not found (from election)' });

    const candidate = new Candidate({
      firstName,
      lastName,
      position,
      election: electionId,
      college: collegeId,
      department: departmentId,
    });

    await candidate.save();
    res.status(201).json({ message: 'Candidate added', candidate });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete Candidate
exports.deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    res.status(200).json({ message: 'Candidate deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all students who voted
exports.getVotedStudents = async (req, res) => {
    try {
      const votes = await Vote.find().populate('voter');
      const voters = votes.map(v => v.voter);
      res.status(200).json({ voters });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Get all students who did NOT vote
  exports.getNonVotedStudents = async (req, res) => {
    try {
      const allStudents = await User.find({ role: 'student' });
      const votes = await Vote.find();
      const votedIds = votes.map(v => v.voter.toString());
  
      const nonVoters = allStudents.filter(student => !votedIds.includes(student._id.toString()));
  
      res.status(200).json({ nonVoters });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  exports.getElectionResults = async (req, res) => {
    try {
      const electionId = req.params.electionId;
  
      const candidates = await Candidate.find({ election: electionId });
  
      const votes = await Vote.find({}).populate('candidate');
  
      const resultMap = {};
  
      // Count votes per candidate
      for (const candidate of candidates) {
        resultMap[candidate._id] = {
          candidate,
          votes: 0,
        };
      }
  
      for (const vote of votes) {
        if (vote.candidate && vote.candidate.election.toString() === electionId) {
          resultMap[vote.candidate._id].votes++;
        }
      }
  
      const results = Object.values(resultMap);
      res.status(200).json({ results });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  