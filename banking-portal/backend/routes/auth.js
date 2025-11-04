/**
 * Authentication Routes
 * Login, Register, OTP, Password Reset
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const validator = require('validator');

const {
  users,
  findUserByEmail,
  findUserByUsername,
  addActivityLog
} = require('../data/mockData');

const {
  generateAndSendOTP,
  verifyOTP,
  storeOTP,
  generateOTP
} = require('../utils/otp');

const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/auth/login
 * Step 1: Validate credentials
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password, captcha } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required.'
      });
    }

    // Simple CAPTCHA validation (in production, use reCAPTCHA)
    if (!captcha || captcha.toLowerCase() !== 'passed') {
      return res.status(400).json({
        success: false,
        message: 'CAPTCHA validation failed.'
      });
    }

    // Find user by username or email
    let user = findUserByUsername(username) || findUserByEmail(username);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.'
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(403).json({
        success: false,
        message: 'Account is locked due to multiple failed attempts. Contact support.'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Increment login attempts
      user.loginAttempts++;

      if (user.loginAttempts >= 5) {
        user.isLocked = true;
      }

      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.',
        attemptsRemaining: Math.max(0, 5 - user.loginAttempts)
      });
    }

    // Reset login attempts
    user.loginAttempts = 0;

    // Check if MFA is enabled
    if (user.mfaEnabled) {
      // Generate and send OTP
      const otpIdentifier = await generateAndSendOTP(user, 'sms');

      return res.json({
        success: true,
        requiresMFA: true,
        otpIdentifier,
        message: 'OTP sent to your registered phone number.'
      });
    }

    // Generate JWT token (if MFA not enabled)
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '24h' }
    );

    // Update last login
    user.lastLogin = new Date().toISOString();

    // Log activity
    addActivityLog({
      logId: `LOG${Date.now()}`,
      userId: user.id,
      action: 'LOGIN',
      ipAddress: req.ip,
      timestamp: new Date().toISOString(),
      status: 'success'
    });

    res.json({
      success: true,
      requiresMFA: false,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        profilePic: user.profilePic,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    });
  }
});

/**
 * POST /api/auth/verify-otp
 * Step 2: Verify OTP and complete login
 */
router.post('/verify-otp', async (req, res) => {
  try {
    const { otpIdentifier, otp } = req.body;

    if (!otpIdentifier || !otp) {
      return res.status(400).json({
        success: false,
        message: 'OTP identifier and OTP are required.'
      });
    }

    // Verify OTP
    const otpResult = verifyOTP(otpIdentifier, otp);

    if (!otpResult.success) {
      return res.status(401).json(otpResult);
    }

    // Extract user ID from identifier
    const userId = otpIdentifier.split('-')[0];
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '24h' }
    );

    // Update last login
    user.lastLogin = new Date().toISOString();

    // Log activity
    addActivityLog({
      logId: `LOG${Date.now()}`,
      userId: user.id,
      action: 'LOGIN_MFA',
      ipAddress: req.ip,
      timestamp: new Date().toISOString(),
      status: 'success'
    });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        profilePic: user.profilePic,
        role: user.role
      }
    });

  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({
      success: false,
      message: 'OTP verification failed.'
    });
  }
});

/**
 * POST /api/auth/forgot-password
 * Initiate password reset
 */
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Valid email is required.'
      });
    }

    const user = findUserByEmail(email);

    // Don't reveal if user exists (security best practice)
    if (!user) {
      return res.json({
        success: true,
        message: 'If the email exists, a reset link has been sent.'
      });
    }

    // Generate reset token
    const resetToken = uuidv4();
    const { resetTokens } = require('../data/mockData');

    resetTokens.set(resetToken, {
      userId: user.id,
      expiryTime: Date.now() + (30 * 60 * 1000) // 30 minutes
    });

    // In production, send email with reset link
    console.log(`🔑 Password reset link for ${email}:`);
    console.log(`   http://localhost:5000/reset-password.html?token=${resetToken}`);

    res.json({
      success: true,
      message: 'If the email exists, a reset link has been sent.',
      // For demo purposes only - remove in production
      resetToken
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process request.'
    });
  }
});

/**
 * POST /api/auth/reset-password
 * Reset password with token
 */
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token and new password are required.'
      });
    }

    // Validate password strength
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long.'
      });
    }

    const { resetTokens } = require('../data/mockData');
    const tokenData = resetTokens.get(token);

    if (!tokenData) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token.'
      });
    }

    if (Date.now() > tokenData.expiryTime) {
      resetTokens.delete(token);
      return res.status(400).json({
        success: false,
        message: 'Reset token has expired.'
      });
    }

    const user = users.find(u => u.id === tokenData.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Delete token
    resetTokens.delete(token);

    // Log activity
    addActivityLog({
      logId: `LOG${Date.now()}`,
      userId: user.id,
      action: 'PASSWORD_RESET',
      timestamp: new Date().toISOString(),
      status: 'success'
    });

    res.json({
      success: true,
      message: 'Password reset successfully.'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password.'
    });
  }
});

/**
 * GET /api/auth/profile
 * Get current user profile
 */
router.get('/profile', authenticateToken, (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        profilePic: user.profilePic,
        role: user.role,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
        preferences: user.preferences,
        mfaEnabled: user.mfaEnabled
      }
    });

  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile.'
    });
  }
});

/**
 * PUT /api/auth/profile
 * Update user profile
 */
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { fullName, phone, email, preferences } = req.body;
    const user = users.find(u => u.id === req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    // Update fields
    if (fullName) user.fullName = fullName;
    if (phone) user.phone = phone;
    if (email && validator.isEmail(email)) user.email = email;
    if (preferences) user.preferences = { ...user.preferences, ...preferences };

    res.json({
      success: true,
      message: 'Profile updated successfully.',
      user: {
        fullName: user.fullName,
        phone: user.phone,
        email: user.email,
        preferences: user.preferences
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile.'
    });
  }
});

/**
 * POST /api/auth/logout
 * Logout user
 */
router.post('/logout', authenticateToken, (req, res) => {
  // In production with sessions, clear session here
  addActivityLog({
    logId: `LOG${Date.now()}`,
    userId: req.user.userId,
    action: 'LOGOUT',
    timestamp: new Date().toISOString(),
    status: 'success'
  });

  res.json({
    success: true,
    message: 'Logged out successfully.'
  });
});

module.exports = router;
