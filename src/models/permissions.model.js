// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const permissions = sequelizeClient.define('permissions', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    write: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  permissions.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    permissions.belongsTo(models.columns, { onDelete: 'CASCADE' }); // generates columnId
    permissions.belongsTo(models.groups, { onDelete: 'CASCADE' }); // generates roleId
  };

  return permissions;
};
