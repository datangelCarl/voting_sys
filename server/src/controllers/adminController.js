const Candidate = require('../schemas/candidateSchema');
const Election = require('../schemas/electionSchema');
const User = require('../schemas/userSchema');
const Vote = require('../schemas/voteSchema');

// Create Election
exports.createElection = async (req, res) => {
    try {
      const { name, position, college, department, startDate, endDate } = req.body;
  
      const election = new Election({
        name,
        position,
        college,
        department,
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
    const { firstName, lastName, position, college, department, electionId } = req.body;

    const election = await Election.findById(electionId);
    if (!election) return res.status(404).json({ message: 'Election not found' });

    const candidate = new Candidate({
      firstName,
      lastName,
      position,
      college,
      department,
      election: electionId,
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
  