import User from './../../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  console.log('register user API called');
  const { firstName,lastName, email, password, role } = req.body;
  console.log('req.body',req.body);
  const hashed = await bcrypt.hash(password, 10);
  try {
    await User.create({ firstName, lastName, email, password: hashed, role });
    res.json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ message: 'Error registering user', error: err });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const userData = user.toObject();
  if (!user) return res.status(404).json({ message: 'User not found' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid password' });

  const now = new Date();
  const last = new Date(user.lastLogin || 0);
  const isNewDay = now.toDateString() !== last.toDateString();
  if (isNewDay) user.credit += 10;
  user.lastLogin = now;
  await user.save();
  
  const {credit,firstName,lastName,recentActivity,role,savedPosts} = userData;
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({credit,email,firstName,lastName,recentActivity,role,savedPosts,token });
};


// 
