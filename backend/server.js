require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');


const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';


// Middleware
app.use(express.json());
app.use(cors());


// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


// User schema
const dailyDataSchema = new mongoose.Schema({
  date: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true },
  sodium: { type: Number, required: false },
  sugar: { type: Number, required: false },
});


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  height: Number,
  weight: Number,
  age: Number,
  gender: String,
  activityLevel: String,
  dailyData: [dailyDataSchema],
});


const User = mongoose.model('User', userSchema);


// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
};


app.get('/', (req, res) => {
  res.send('Server is running');
});


// Registration route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;


  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();


    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});


// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;


  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });


    const token = generateToken(user);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});


// Middleware to protect routes
const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');


  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};


// Route to update user info
app.post('/update-info', authenticate, async (req, res) => {
  const { height, weight, age, gender, activityLevel } = req.body;


  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { height, weight, age, gender, activityLevel },
      { new: true }
    );


    res.status(200).json({ message: 'User info updated', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user info', error });
  }
});




// Route to add or update daily nutritional data
app.post('/add-daily-data', authenticate, async (req, res) => {
  const { calories, protein, carbs, fats, sodium, sugar } = req.body;
  const userId = req.user.id;


  try {
    // Get today's date in ISO string format for consistent formatting
    const dateString = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format


    // Find the user's daily data for today's date
    const dailyData = await User.findOne(
      { _id: userId, 'dailyData.date': dateString },
      { 'dailyData.$': 1 } 
    );


    if (dailyData) {

      await User.updateOne(
        { _id: userId, 'dailyData.date': dateString },
        {
          $inc: {
            'dailyData.$.calories': calories,
            'dailyData.$.protein': protein,
            'dailyData.$.carbs': carbs,
            'dailyData.$.fats': fats,
            'dailyData.$.sodium': sodium, 
            'dailyData.$.sugar': sugar,   
          },
        }
      );
      return res.status(200).json({ message: 'Nutritional data updated successfully' });
    } else {

      await User.updateOne(
        { _id: userId },
        {
          $push: {
            dailyData: {
              date: dateString,
              calories,
              protein,
              carbs,
              fats,
              sodium,
              sugar,
            },
          },
        }
      );
      return res.status(201).json({ message: 'Nutritional data added successfully' });
    }
  } catch (error) {
    console.error('Error adding daily nutritional data:', error);
    return res.status(500).json({ message: 'Error updating nutritional data', error: error.message });
  }
});


// Route to get user info
app.get('/user-info', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ message: 'Error fetching user info', error: error.message });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



