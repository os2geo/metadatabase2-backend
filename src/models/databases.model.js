// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const databases = sequelizeClient.define('databases', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    schema: {
      type: DataTypes.JSONB,
      allowNull: false
    }
  }, {
    name: {
      singular: 'database',
      plural: 'databases',
    },
    indexes: [
      { method: 'BTREE', fields: ['organizationId'] }
    ],
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  databases.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    databases.belongsTo(models.organizations, { onDelete: 'CASCADE' }); // generates organizationId
  };

  return databases;
};
