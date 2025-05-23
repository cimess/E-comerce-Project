// checkPermission.js
const permissions = require('./permissions');

function checkPermission(action) {
  return (req, res, next) => {
    const userRole = req.user?.role; // assuming role is set in req.user (user role)
    if (!userRole || !permissions[userRole]?.includes(action)) {
      return res.status(403).json({ message: 'Forbidden: You do not have access' });
    }
    next();
  };
}

module.exports = checkPermission;
