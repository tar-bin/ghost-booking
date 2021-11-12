'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventDates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EventDates.belongsTo(models.Events, {
        foreignKey: 'eventId',
        onDelete: 'CASCADE'
      })
    }
  };
  EventDates.init({
    date: DataTypes.STRING,
    eventId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EventDates',
  });
  return EventDates;
};