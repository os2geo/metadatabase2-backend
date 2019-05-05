// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return context => {
    context.params.sequelize = {
      raw: false,
      include: [
        {
          model: context.app.services.roles.Model,
          attributes: ['name']
        }
      ]
    };
    return context;
  };
};
