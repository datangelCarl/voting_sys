const User = require("../schemas/userSchema");
const { hashPassword } = require("../utils/authUtils");

module.exports = {
  // Updated to match userSchema
  createUser: async ({ name, email, password, role, college, department }) => {
    const hashed = await hashPassword(password);

    const payload = {
      name,
      email,
      password: hashed,
      role,
      college: role === 'student' ? college : undefined,
      department: role === 'student' ? department : undefined,
    };

    return await User.create(payload);
  },

  findUserByEmail: async (email) => {
    return await User.findOne({ email });
  },

  updateUserVote: async (userId) => {
    return await User.findByIdAndUpdate(userId, { hasVoted: true }, { new: true });
  }
};
