const express = require('express')
const User = require('../Model/userModel')
const router = express.Router()



router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      // Incorrect email or password
      user.loginAttempts += 1;
      await user.save();

      if (user.loginAttempts >= 5 && !user.blockedUntil) {
        // Block the user for 24 hours from the last incorrect attempt
        user.blockedUntil = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await user.save();
      }

      if (user.blockedUntil && user.blockedUntil > Date.now()) {
        const remainingTime = Math.ceil((user.blockedUntil - Date.now()) / (60 * 60 * 1000));
        return res.status(401).json({ message: `Account blocked. Try again after ${remainingTime} hours.` });
      }

      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    // Check if the user is blocked and still within the block period
    if (user.blockedUntil && user.blockedUntil > Date.now()) {
      const remainingTime = Math.ceil((user.blockedUntil - Date.now()) / (60 * 60 * 1000));
      return res.status(401).json({ message: `Account blocked. Try again after ${remainingTime} hours.` });
    }

    // Reset login attempts on successful login
    user.loginAttempts = 0;
    user.blockedUntil = null;
    await user.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports=router;
