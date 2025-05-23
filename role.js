// setting the roles used
const roles = {
  ADMIN: 'admin',
  USER: 'user',
};

module.exports = roles;

//setting the permissions for each roles
const roles = require('./roles');

const permissions = {
  [roles.ADMIN]: ['addProduct', 'deleteProduct', 'setProductPrice', 'manageUser'],
  [roles.USER]: ['viewProduct', 'viewProductPrice', 'purchaseProduct'],
};

module.exports = permissions;
