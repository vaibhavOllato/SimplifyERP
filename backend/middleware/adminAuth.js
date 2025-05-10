import jwt from "jsonwebtoken";

const isAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admins only." });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

export default isAdmin;
