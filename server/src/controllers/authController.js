const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;



exports.register = async (req, res) => {
  try {
    const { name, email, password, role, college, department } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(409).json({ message: 'Email already exists' });

    if (role === 'student' && (!college || !department)) {
      return res.status(400).json({ message: 'College and department are required for student registration' });
    }

    const newUser = await createUser({ name, email, password, role, college, department });

    res.status(201).json({
      message: 'User registered successfully',
      user: { name: newUser.name, email: newUser.email, role: newUser.role }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({ message: 'Login successful', token, user: { name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
