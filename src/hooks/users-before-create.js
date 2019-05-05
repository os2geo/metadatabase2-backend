// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    if(context.params.user.roleId === 1 || (context.params.user.roleId === 2 && context.data.roleId > 1 && context.params.user.organizationId === context.data.organizationId)) {
      return context;
    }
    throw new Error('You ar not allowed to create users with system role');
  };
};
