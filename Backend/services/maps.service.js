import axios from 'axios';
import captainModel from '../models/captain.model.js';

const getAddressCoordinate = async (address) => {
    const apiKey = process.env.MAPBOX_API;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.features && response.data.features.length > 0) {
            const location = response.data.features[0].center;
            if (Array.isArray(location) && location.length === 2) {
                return {
                    lat: location[1],
                    lng: location[0]
                }
            } else {
                throw new Error('Invalid coordinates format');
            }
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }
    const apiKey = process.env.MAPBOX_API;

    // Convert origin and destination to coordinates
    const originCoordinates = await getAddressCoordinate(origin);
    const destinationCoordinates = await getAddressCoordinate(destination);


    if (!originCoordinates || !destinationCoordinates) {
        throw new Error('Invalid coordinates');
    }

    // Calculate the distance between the origin and destination
    const distance = Math.sqrt(
        Math.pow(destinationCoordinates.lng - originCoordinates.lng, 2) +
        Math.pow(destinationCoordinates.lat - originCoordinates.lat, 2)
    );

    // Check if the distance exceeds the maximum limit (e.g., 10000 km)
    const maxDistance = 10000; // Adjust this value as needed
    if (distance > maxDistance) {
        throw new Error('Route exceeds maximum distance limitation');
    }

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${originCoordinates.lng},${originCoordinates.lat};${destinationCoordinates.lng},${destinationCoordinates.lat}?access_token=${apiKey}`;
    try {
        const res = await axios.get(url);
        if (res.data.routes && res.data.routes.length > 0) {
            const route = res.data.routes[0];
            console.log('Distance in meters:', route.distance); // Log the distance
            console.log('Duration in seconds:', route.duration); // Log the duration

            // Convert distance to kilometers
            const distanceInKm = route.distance / 1000;

            // Convert duration to [days, hours, minutes]
            const durationInMinutes = Math.floor(route.duration / 60);
            const days = Math.floor(durationInMinutes / (24 * 60));
            const hours = Math.floor((durationInMinutes % (24 * 60)) / 60);
            const minutes = durationInMinutes % 60;

            return {
                distance: distanceInKm,
                duration: {
                    days,
                    hours,
                    minutes,
                    durationInMinutes
                }
            };
        } else {
            throw new Error('No route found');
        }
    } catch (error) {
        console.error('Error response:', error.response ? error.response.data : error.message); // Log the error response
        throw error;
    }
};

const getAutoComleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Query is required');
    }
    const apiKey = process.env.MAPBOX_API;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(input)}.json?access_token=${apiKey}`;
    try {
        const res = await axios.get(url);
        if (res.data.features && res.data.features.length > 0) {
            return res.data.features.map(feature => feature.place_name);
        } else {
            return [];
        }
    } catch (err) {
        console.error('Error fetching suggestions:', err);
        throw new Error('Unable to fetch suggestions');
    }
};

const getCaptainInTheRadius = async (ltd, lng, radius) => {
    if (!ltd || !lng) {
        throw new Error('Invalid coordinates');
    }
    try {
        const captains = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[ltd, lng], radius / 6371]
                }
            }
        });      
        return captains;
    } catch (error) {
        console.error('Error fetching captains:', error);
    }
    
};

export { getAddressCoordinate, getDistanceTime, getCaptainInTheRadius, getAutoComleteSuggestions };