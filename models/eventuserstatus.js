'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventUserStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EventUserStatus.belongsTo(models.Events, {
        foreignKey: 'eventId',
        onDelete: 'CASCADE'
      })
      EventUserStatus.belongsTo(models.EventDates, {
        foreignKey: 'dateId',
        onDelete: 'CASCADE'
      })
    }
  };
  EventUserStatus.init({
    eventId: DataTypes.INTEGER,
    dateId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    value: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EventUserStatus',
  });
  return EventUserStatus;
};