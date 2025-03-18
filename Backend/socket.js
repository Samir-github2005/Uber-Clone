import { Server } from 'socket.io';
import userModel from './models/userModels.js';
import captainModel from './models/captain.model.js';

let io = null;

const initializeSocket = (server) => {
    try {
        io = new Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });

        io.on('connection', (socket) => {
            console.log('A user connected:', socket.id);

            socket.on('join', async(data) => {
                const { userId, userType } = data;
                console.log('User joined:', userId, userType);
                
                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, {
                        socketId: socket.id
                    });
                } else if (userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId, {
                        socketId: socket.id
                    });
                }
            });

            socket.on('update-location-captain', async(data) => {
                const { userId, location } = data;
                if (!location || !location.ltd || !location.lng) {
                    return socket.emit('error', { message: 'Invalid location' });
                }
                await captainModel.findByIdAndUpdate(userId, {
                    location: {
                        ltd: location.ltd,
                        lng: location.lng
                    }
                });
            });

            socket.on('disconnect', async (reason) => {
                console.log('User disconnected:', socket.id, 'Reason:', reason);
                await userModel.findOneAndUpdate({ socketId: socket.id }, { socketId: null });
                await captainModel.findOneAndUpdate({ socketId: socket.id }, { socketId: null });
            });

            socket.on('error', (error) => {
                console.error('Socket error:', error);
            });
        });

        return io;
    } catch (error) {
        console.error('Socket initialization error:', error);
        throw error;
    }
};

const sendMessageToSocketId = (socketId, messageObj) => {
    try {
        console.log(`Sending message to socketId: ${socketId}`, messageObj);
        io.to(socketId).emit(messageObj.event, messageObj.data);
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

export { initializeSocket, sendMessageToSocketId };
