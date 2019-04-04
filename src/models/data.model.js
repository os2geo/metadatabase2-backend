// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const data = sequelizeClient.define('data', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    doc: {
      type: DataTypes.JSONB,
      allowNull: false
    }
  }, {
    indexes: [
      { method: 'BTREE', fields: ['databaseId'] }
    ],
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  data.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    data.belongsTo(models.databases, { onDelete: 'CASCADE', foreignKey: 'databaseId' }); // generates databaseId
  };

  return data;
};
