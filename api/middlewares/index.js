const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.get('Verified');
    const decoded = await jwt.verify(token, process.env.jwtSecret);
    req.decoded = decoded;
    next();
  } catch (e) {
    console.log("ERROR IN MIDDLEWARE: ", e);
    return res.status(403).json({
      errorMessage: "No token provided, must be set on the Verified Header"
    })
  }
};

module.exports = {
  isAuthenticated,
};
