require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

// הגדרות Express
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// חיבור ל-MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// סכמת המשתמש
const userSchema = new mongoose.Schema({
  name: String,
  location: String,
  bio: String,
  profileImage: String, // קישור לתמונת הפרופיל
});

const User = mongoose.model('User', userSchema);

// הגדרת Multer להעלאת תמונות
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // שם ייחודי לתמונה
  },
});

const upload = multer({ storage });

// API להעלאת תמונת פרופיל
app.post('/upload', upload.single('profileImage'), async (req, res) => {
  try {
    const { name, location, bio } = req.body;
    const profileImage = `/uploads/${req.file.filename}`;
    
    const newUser = new User({
      name,
      location,
      bio,
      profileImage,
    });

    await newUser.save();
    res.json({ message: 'Profile uploaded successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API לקבלת פרטי משתמש
app.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// האזנה לשרת
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
