import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['USER', 'ADMIN'], default: 'user' },
  credit: { type: Number, default: 0 },
  lastLogin: Date,
  savedPosts: [
    {
      title: String,
      url: String,
      source: String,
      thumbnail: String,
      savedAt: { type: Date, default: Date.now }
    }
  ],
  recentActivity: [
    {
      type: { type: String, enum: ['SAVE', 'SHARE', 'REPORT'] },
      post: {
        title: String,
        url: String,
        source: String,
        thumbnail: String
      },
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

const User = mongoose.model('User', userSchema);

export default User;
