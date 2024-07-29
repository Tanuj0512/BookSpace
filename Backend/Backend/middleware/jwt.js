import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_hardcoded_jwt_secret_key_here';

export const verifyToken = (req, res, next) => {
  const accessToken = req.cookies['access-token'];

  if (!accessToken) {
    return res.status(401).json({ error: "Access token not provided" });
  }

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    req.user = decoded; // Attach decoded user information to the request object
    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    res.status(401).json({ error: "Invalid token" });
  }
};

export const createTokens = (user) => {
  const accessToken = jwt.sign(
    { username: user.username, id: user.id, isAdmin: user.isAdmin },
    JWT_SECRET,
    { expiresIn: '10h' }
  );
  return accessToken;
};
