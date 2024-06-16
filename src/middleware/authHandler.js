require('dotenv').config()
const jwtHandler = require("../config/jwt-Token.js");
const User = require("../models/userModel.js");





/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const authToken = async (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      let accessToken = req.headers["authorization"] ?? req.headers["authorization"]

      const decoded = await jwtHandler.verifyToken(accessToken)
      console.log('Verify User = ', decoded.id);

      req.user = await User.findById(decoded.id).select('-password');

      next();

    } catch (error) {
      return res.status(401).json("Not authorized, token failed");
      }
      
      } else {
        return res.status(401).json("Not authorized, token failed");
  }

}










// module.exports = { protect };
module.exports = { authToken };