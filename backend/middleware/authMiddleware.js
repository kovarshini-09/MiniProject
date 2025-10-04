const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
      const decoded = jwt.verify(token, 'secretkey');
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Not authorized' });
      }
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
  };
};

module.exports = authMiddleware;
