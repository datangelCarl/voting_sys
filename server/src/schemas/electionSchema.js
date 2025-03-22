const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  college: { type: String, required: true },
  department: { type: String, required: true },
  status: {
    type: String,
    enum: ['upcoming', 'active', 'closed'],
    default: 'upcoming',
  },
  startDate: { type: Date },
  endDate: { type: Date },
});

module.exports = mongoose.model('Election', electionSchema);
