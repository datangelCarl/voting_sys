const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
    enum: ['President', 'Vice President', 'Secretary', 'Treasurer', 'Class Representative'], // customize as needed
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  election: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Election',
    required: true,
  }
  
});

module.exports = mongoose.model('Candidate', candidateSchema);
