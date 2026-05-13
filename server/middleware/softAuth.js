// middleware/softAuth.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      req.userId = null;
      return next();
    }

    const token = authHeader.replace('Bearer ',');
    
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded.userId || null;
    }
    
    next();
  } catch (error) {
    req.userId = null;
    next();
  }
};