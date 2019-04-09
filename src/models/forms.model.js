// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const forms = sequelizeClient.define('forms', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    doc: {
      type: DataTypes.JSONB,
      allowNull: false
    }
  }, {
    indexes: [
      { method: 'BTREE', fields: ['databaseId'] },
      { method: 'BTREE', fields: ['organizationId'] }
    ],
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  forms.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    forms.belongsTo(models.organizations, { onDelete: 'CASCADE' }); // generates organizationId
    forms.belongsTo(models.databases); // generates databaseId
  };

  return forms;
};
