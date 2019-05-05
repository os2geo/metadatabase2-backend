// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
    isVerified: { type: DataTypes.BOOLEAN },
    verifyToken: { type: DataTypes.STRING },
    verifyShortToken: { type: DataTypes.STRING },
    verifyExpires: { type: DataTypes.DATE }, // or a long integer
    verifyChanges: { type: DataTypes.JSONB }, // an object (key-value map), e.g. { field: "value" }
    resetToken: { type: DataTypes.STRING },
    resetShortToken: { type: DataTypes.STRING },
    resetExpires: { type: DataTypes.DATE } // or a long integer
  }, {
    indexes: [
      { method: 'BTREE', fields: ['organizationId'] },
      { method: 'BTREE', fields: ['roleId'] }
    ],
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  users.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    users.belongsTo(models.organizations, { onDelete: 'CASCADE' }); // generates organizationId
    users.belongsTo(models.roles, { onDelete: 'CASCADE' }); // generates roleId
  };

  return users;
};
