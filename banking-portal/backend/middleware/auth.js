/**
 * Authentication Middleware
 * JWT token verification and user authentication
 */

const jwt = require('jsonwebtoken');
const { findUserById } = require('../data/mockData');

/**
 * Verify JWT token and authenticate user
 */
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Invalid or expired token.'
        });
      }

      // Get user from database
      const user = findUserById(decoded.userId);

      if (!user || !user.isActive) {
        return res.status(403).json({
          success: false,
          message: 'User not found or inactive.'
        });
      }

      // Attach user to request
      req.user = {
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };

      next();
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Authentication error.'
    });
  }
};

/**
 * Check if user has admin role
 */
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.'
    });
  }
};

/**
 * Verify OTP for sensitive operations
 */
const verifyOTPMiddleware = (req, res, next) => {
  const { otp, transactionId } = req.body;

  if (!otp || !transactionId) {
    return res.status(400).json({
      success: false,
      message: 'OTP and transaction ID required.'
    });
  }

  // OTP verification handled in route
  next();
};

module.exports = {
  authenticateToken,
  isAdmin,
  verifyOTPMiddleware
};
