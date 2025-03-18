import userModel from "../models/userModels.js";

const createUser = async ({ firstName, lastName, email, password }) => {
    try {
        if (!firstName || !email || !password) {
            throw new Error("Please provide all the required fields");
        }
        const user = new userModel({
            fullName: {
                firstName,
                lastName
            },
            email,
            password
        });
        await user.save(); 
        return user;
    } catch (error) {
        console.log(error);
    }
}

export { createUser };
