const jwt = require('jsonwebtoken');

module.exports = (role) => (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if (role && req.user.role !== role) return res.status(403).json({ error: 'Forbidden' });
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};