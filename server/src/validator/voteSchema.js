const { z } = require('zod');

exports.voteSchema = z.object({
  candidateId: z.string().min(1, "Candidate ID is required"),
});
