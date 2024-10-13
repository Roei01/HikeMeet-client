const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const User = require('./models/User'); // ניצור את המודל הזה בהמשך

mongoose.connect('mongodb://localhost:27017/hikemeet', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API לרישום משתמש
app.post('/api/register', async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;

  // בדיקה אם המשתמש כבר קיים
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Username or Email already exists' });
  }

  // הצפנת הסיסמא
  const hashedPassword = await bcrypt.hash(password, 10);

  // יצירת משתמש חדש
  const user = new User({ username, firstName, lastName, email, password: hashedPassword });
  await user.save();

  res.json({ success: true });
});

// API להתחברות משתמש
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // בדיקה אם המשתמש קיים
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid username or password' });
  }

  // בדיקת סיסמא
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ success: false, message: 'Invalid username or password' });
  }

  // יצירת טוקן JWT
  const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

  res.json({ success: true, token });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
