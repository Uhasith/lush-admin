const allRoles = {
  Worker: ['viewCategory', 'manageMessages', 'manageProducts', 'manageUsers'],
  Admin: [
    'getUsers',
    'manageUsers',
    'manageProducts',
    'getProducts',
    'manageDocuments',
    'manageCategory',
    'viewCategory',
    'manageReports',
    'manageMessages',
    'manageAdminOnlyMessages',
  ],
  Visitor: ['viewCategory', 'manageMessages', 'manageProducts'],
};

const workerTypes = ['Farmer', 'Other', 'Visitor'];
const workerStatus = ['Active', 'Pending', 'Reviewing', 'Deactivated'];

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
  workerTypes,
  workerStatus,
};
