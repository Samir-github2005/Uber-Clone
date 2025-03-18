import express from 'express';
const router = express.Router();
import { body,query } from 'express-validator';
import { create, Fare, confirmRide, startRide, endRide, updateLocation } from '../controllers/ride.controller.js';
import {authCaptain, authUser} from '../middleware/auth.middleware.js'

router.post('/create',authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'motorcycle']).withMessage('Invalid vehicle type'),
    create
)

router.get('/get-fare',authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address')
    ,Fare
)

router.post('/confirm',authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride ID'),
    confirmRide
)

router.get('/start-ride',authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride ID'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    startRide
)

router.post('/end-ride',authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride ID'),
    endRide
)

router.post('/update-location', authUser,
  body('userId').isMongoId().withMessage('Invalid user ID'),
  body('location').isObject().withMessage('Invalid location'),
  updateLocation
);

export default router;