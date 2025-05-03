// src/controllers/adminController.js
import User from './../../models/userModel.js';

export const getUserAnalytics = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'ADMIN' } });  // Fetch all users except admin
    const activities = await User.aggregate([
      { $unwind: "$recentActivity" },
      { $sort: { "recentActivity.timestamp": -1 } }
    ]);

    res.json({
      users: users.map(user => ({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        credit: user.credit,
        email:user.email,
        savedPosts: user.savedPosts,
        recentActivity: user.recentActivity,
      })),
      activities: activities.map(activity => ({
        timestamp: activity.recentActivity.timestamp,
        type: activity.recentActivity.type,
        post: activity.recentActivity.post,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user analytics or feed activity' });
  }
};

export const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
  };
  
export const updateUserCredit = async (req, res) => {
    const { userId, credit } = req.body;
    const user = await User.findById(userId);
    user.credit = credit;
    await user.save();
    res.json({ message: 'User credit updated' });
  };
  
