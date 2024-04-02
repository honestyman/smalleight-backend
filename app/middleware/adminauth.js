const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
     
    // Implement your custom token verification logic
    // For example, you can decode and validate the token manually
    try {
      const decodedToken = Buffer.from(token, 'base64').toString('utf-8');
      const [adminName, password, secretKey] = decodedToken.split(':');

      // Perform any additional validation or checks here, such as checking the secretKey

      req.user = { adminName, password }; // Attach the user information to the request object
      next(); // Call the next middleware or route handler
    } catch (error) {
      // Token verification failed
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    // No token provided
    res.status(401).json({ message: 'No token provided' });
  }
  // Get token from header
  // const authHeader = String(req.headers['authorization'] || '');
  // console.log("111",authHeader);
  // if (authHeader.startsWith('Bearer ')) {
  //   const token = authHeader.substring(7, authHeader.length);
  //   try {
  //     const decoded = jwt.verify(token, config.get("jwtSecret"));
  //     req.user = decoded.user;
  //     next();
  //   } catch (err) {
  //     res.status(401).json({ msg: "Token is not valid" });
  //   }
  // } else {
  //   return res.status(401).json({ msg: "No token, Authorization Denied" });
  // }
};
