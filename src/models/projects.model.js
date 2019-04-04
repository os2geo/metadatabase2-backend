// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const projects = sequelizeClient.define('projects', {
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
      { method: 'BTREE', fields: ['databaseId'] }
    ],
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  projects.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    projects.belongsTo(models.databases, { onDelete: 'CASCADE', foreignKey: 'databaseId' }); // generates databaseId
  };

  return projects;
};
