const jwt = require('jsonwebtoken');

// ✅ Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided' });
    }

    try {
        // Remove 'Bearer ' prefix and verify the token
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = {
    verifyToken,
};
