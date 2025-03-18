import { getAddressCoordinate,getDistanceTime, getAutoComleteSuggestions } from '../services/maps.service.js';
import { validationResult } from "express-validator";

const getCoordinates = async (req, res, next) => {
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const { address } = req.query;
    try {
        const coordinates = await getAddressCoordinate(address);
        res.status(200).json(coordinates);
        console.log(coordinates);
        
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found' });
    }
}

const getDistance= async (req,res,next) => {
    try {
        const errors= validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()})
        }
        const {origin,destination}=req.query
        const distanceTime= await getDistanceTime(origin,destination)
        res.status(200).json(distanceTime)
    } catch (err) {
        console.log(err);
        res.status(500).json({message:'Server Error'})
    }
}

const getSuggestions = async (req, res, next) => {
    try {
        const error= validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({error: error.array()})
        }
        const {input}= req.query
        const suggestions= await getAutoComleteSuggestions(input)
        res.status(200).json(suggestions)
        
    } catch (err) {
        console.log(err);
        res.status(500).json({message:'Server error'})
    }
}

export {getCoordinates,getDistance, getSuggestions}