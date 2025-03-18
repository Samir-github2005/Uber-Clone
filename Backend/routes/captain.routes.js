import express from 'express';
const router = express.Router();
import { body } from 'express-validator';
import { registerCaptain, loginCaptain, logoutCaptain, getCaptainProfile } from '../controllers/captain.controller.js';
import { authCaptain } from '../middleware/auth.middleware.js';

router.post('/register', [
  body('fullName.firstName').isLength({ min: 3 }).withMessage("First name should be at least 3 characters long"),
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").isLength({ min: 6 }).withMessage("Password should be at least 6 characters long"),
  body('vehicle.color').isLength({ min: 3 }).withMessage("Color should be at least 3 characters long"),
  body('vehicle.plate').isLength({ min: 3 }).withMessage("Plate should be at least 3 characters long"),
  body('vehicle.capacity').isInt({ min: 1 }).withMessage("Capacity should be at least 1"),
  body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
], registerCaptain);

router.post('/login', [
  body('email').isEmail().withMessage("Please enter a valid email"),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], loginCaptain);

router.get('/profile', authCaptain, getCaptainProfile);

router.get('/logout', authCaptain, logoutCaptain);

export default router;