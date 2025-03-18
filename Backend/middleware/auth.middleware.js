import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken";
import captainModel from "../models/captain.model.js";
import BlackListToken from "../models/blackListToken.models.js";

const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const isBlacklist = await BlackListToken.findOne({ token: token });
  if (isBlacklist) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token Found" });
  }
  const isBlacklist = await BlackListToken.findOne({ token: token });
  if (isBlacklist) {
    return res.status(401).json({ message: "Blacklist" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded.id);
    if (!captain) {
      return res.status(401).json({ message: "Captain not found" });
    }
    req.captain = captain;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Something happened" });
  }
};

export { authUser, authCaptain };
