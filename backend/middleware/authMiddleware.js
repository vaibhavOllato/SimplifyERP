// import jwt from 'jsonwebtoken';

// const authMiddleware = (req, res, next) => {
//   const token = req.headers['authorization']?.split(' ')[1]; 
  
//   console.log('Token:', token); 
//   if (!token) {
//     return res.status(401).json({ message: "Access denied. No token provided." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
//     req.user = decoded; // Attach decoded user data to the request object
//     console.log('User from Token:', req.user);

//     next(); // Proceed to the next middleware or route handler
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid or expired token." }); // Invalid token error
//   }
// };

// export default authMiddleware;


const authMiddleware = (req, res, next) => {
  // Check if the user session exists
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized. Please login." });
  }

  // If the user is authenticated, attach user data to the request object
  req.user = req.session.user;

  console.log('User from session:', req.user);

  // Proceed to the next middleware or route handler
  next();
};

export default authMiddleware;
