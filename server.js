const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/user');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from current directory
app.use(express.static(__dirname));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Heartofindiatours', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('Users', userSchema);

// Handle signup
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).send('User already exists.');

    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).send('Signup successful!');
  } catch (err) {
    res.status(500).send('Server error.');
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/signup.html');
});
