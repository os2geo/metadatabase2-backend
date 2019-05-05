// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    if(context.params.user.roleId === 1) {
      return context;
    }
    if(context.params.user.roleId === 2) {
      const user = await context.app.service('users').get(context.id);
      if(user && user.organizationId === context.params.user.organizationId) {
        return context;
      }
    }
    throw new Error('You ar not allowed to edit users from other companies');
  };
};
