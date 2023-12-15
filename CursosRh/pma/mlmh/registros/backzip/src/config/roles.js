const allRoles = {
  user: ['padrao', 'criarValorInput'],
  analista: ['padrao', 'criarValorInput', 'julgar'],
  admin: ['padrao', 'criarValorInput', 'julgar', 'getUsers', 'manageUsers', 'logs'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
