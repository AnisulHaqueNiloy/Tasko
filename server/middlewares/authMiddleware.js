const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   let token;
//   let authHeader = req.headers.authorization;
//   if (authHeader) {
//     token = authHeader.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ message: "no token" });
//     }
//     try {
//       console.log(token);
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded; // Attach the user ID to the request object
//       console.log(decoded); // Log the decoded token for debugging
//       next(); // Call the next middleware or route handler
//     } catch {
//       return res.status(401).json({ message: "invalid token" });
//     } // Attach the user ID to the request object
//   }
// };
// module.exports = verifyToken;
const verifyToken = (req, res, next) => {
  const token =
    req.cookies.token ||
    req.headers.authorization?.split(" ")[1] ||
    req.headers.Authorization?.split(" ")[1]; // Check for token in cookies or headers
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //ss
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = verifyToken;
