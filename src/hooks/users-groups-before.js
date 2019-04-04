// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    context.params.sequelize = {
      raw: false,
      include: [
        {
          model: context.app.services.users.Model,
          attributes: ['name', 'email']
        }
      ]
    };
    return context;
  };
};
