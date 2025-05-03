import axios from 'axios';
import User from './../../models/userModel.js';

// export const getFeed = async (req, res) => {
//   const { after } = req.query; // read from query string
//   try {

//     const reddit = await axios.get(`https://www.reddit.com/r/popular.json${after ? `?after=${after}` : ''}`);
//     // console.log('reddit',reddit.data.data.children);
//     const posts = reddit.data.data.children.map(p => ({
//       title: p.data.title,
//       url: p.data.url,
//       source: 'Reddit',
//       thumbnail: p.data.thumbnail
//     }));
//     // console.log('posts',posts);
//     res.json(posts);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching feed' });
//   }
// };



// Controller to fetch Reddit feed with pagination
export const getFeed = async (req, res) => {
  try {
    const { after } = req.query; // Grab the 'after' parameter for pagination (it will be used by Reddit API)
    const redditResponse = await axios.get('https://www.reddit.com/r/popular.json', {
      params: { after }, // If 'after' is provided, it will fetch the next set of posts
      limit:25,
    });

    // Map the Reddit data to a structure you need
    const posts = redditResponse.data.data.children.map((p) => ({
      title: p.data.title,
      url: p.data.url,
      source: 'Reddit',
      thumbnail: p.data.thumbnail,
    }));

    // Send back posts and the next 'after' for pagination
    res.json({
      posts,
      nextPage: redditResponse.data.data.after, // Pass the 'after' value to be used for pagination
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching feed' });
  }
};


// export const savePost = async (req, res) => {
//   const user = await User.findById(req.user.id);
//   user.savedPosts.push(req.body);
//   user.credit += 5;
//   user.recentActivity.push({ type: 'save', post: req.body });
//   await user.save();
//   res.json({ message: 'Post saved and credit awarded' });
// };

// controllers/feedController.js
// import User from '../../models/userModel.js';

export const savePost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const post = req.body;
    user.savedPosts.push(post);
    user.credit += 5;
    user.recentActivity.push({ type: 'SAVE', post });
    await user.save();
    res.json({ message: 'Post saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save post' });
  }
};

export const sharePost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const post = req.body;
    user.credit += 2;
    user.recentActivity.push({ type: 'SHARE', post });
    await user.save();
    res.json({ message: 'Post shared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to record share' });
  }
};

export const reportPost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const post = req.body;
    user.recentActivity.push({ type: 'REPORT', post });
    await user.save();
    res.json({ message: 'Post reported successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to report post' });
  }
};



