import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

/**
 * Validation middleware for login
 */
const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

/**
 * Generate JWT Token
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your_jwt_secret_here', {
    expiresIn: '30d',
  });
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
router.post(
  '/login',
  validateLogin,
  asyncHandler(async (req, res) => {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array()[0].msg,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Find user by email (include password field)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Account is deactivated. Please contact administrator.',
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Return user data (without password)
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: 'Login successful',
    });
  })
);

export default router;

