const User = require("../schemas/userSchema");
const { hashPassword } = require("../utils/authUtils");

module.exports = {
  createUser: async (firstName, lastName, password, email, age, department, college) => {
    const payload = {
      firstName,
      lastName,
      password: await hashPassword(password),
      email,
      age,
      department,
      college,
    };
    return await User.create(payload);
  },

  findUserByEmail: async (email) => {
    return await User.findOne({ email });
  },

  getAllStudents: async () => {
    return await User.find({ role: 'student' });
  },

  deleteUser: async (id) => {
    return await User.findByIdAndDelete(id);
  },

  updateUserRole: async (id, newRole) => {
    return await User.findByIdAndUpdate(id, { role: newRole }, { new: true });
  }, 

  updateUserVote: async (userId) => {
    return await User.findByIdAndUpdate(userId, { hasVoted: true }, { new: true });
  },
  
  
};
