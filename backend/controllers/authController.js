// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');

require('dotenv').config();

exports.register = async (req, res) => {
  const { companyName, adminName, adminEmail, password } = req.body;

  try {
    // Check if the adminEmail already exists
    const existingUser = await prisma.user.findUnique({
      where: { adminEmail },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Admin with this email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        companyName,
        adminName,
        adminEmail,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: 'Admin registered successfully', user: newUser });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Login controller
exports.login = async (req, res) => {
  const { adminEmail, password } = req.body;

  try {
    // Find the admin by email
    const user = await prisma.user.findUnique({
      where: { adminEmail },
    });

    if (!user) {
      return res.status(400).json({ error: 'Admin not found' });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({ message: 'Login successful', token,userInfo: {
      id: user.id,
      adminName: user.adminName,
      companyName: user.companyName,
      adminEmail: user.adminEmail,
      createdAt: user.createdAt,
    }, });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Server error' });
  }
};