import express from 'express';
import {query} from 'express-validator'
import {authUser} from '../middleware/auth.middleware.js'
import {getCoordinates, getDistance, getSuggestions} from '../controllers/maps.controller.js';
const router = express.Router();

router.get('/get-coordinates', 
    query('address').isString().isLength({min :3}),authUser,
    getCoordinates);

router.get('/get-distance-time',
    query('origin').isString().isLength({min :3}),
    query('destination').isString().isLength({min :3}),
    authUser, getDistance)

router.get('/get-suggestions',
    query('input').isString().isLength({min :3}),
    authUser, getSuggestions)

export default router;