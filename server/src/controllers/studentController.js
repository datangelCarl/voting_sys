const { findUserByEmail, updateUserVote } = require('../models/userModel');
const Candidate = require('../schemas/candidateSchema');
const Vote = require('../schemas/voteSchema');

// Cast a Vote
exports.vote = async (req, res, next) => {
  try {
    const userId = req.user.userId; // from JWT middleware
    const { candidateId } = req.body;

    const user = await findUserByEmail(req.user.email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.hasVoted) {
      return res.status(403).json({ message: 'You have already voted' });
    }

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    const vote = new Vote({
      voter: userId,
      candidate: candidateId,
      election: candidate.election, // assumes Candidate schema includes election ref
    });
    await vote.save();

    await updateUserVote(userId);

    res.status(200).json({ message: 'Vote submitted successfully' });

  } catch (err) {
    next(err);
  }
};

// ✅ Get Realtime Vote Status
exports.getVoteStatus = async (req, res, next) => {
  try {
    const status = await Vote.find()
      .populate('candidate', 'name position')
      .populate('voter', 'name email');

    res.status(200).json({ totalVotes: status.length, votes: status });

  } catch (err) {
    next(err);
  }
};
