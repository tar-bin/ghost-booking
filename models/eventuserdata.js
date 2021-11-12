'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventUserData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EventUserData.belongsTo(models.Events, {
        foreignKey: 'eventId',
        onDelete: 'CASCADE'
      })
    }
  };
  EventUserData.init({
    name: DataTypes.STRING,
    eventId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EventUserData',
  });
  return EventUserData;
};