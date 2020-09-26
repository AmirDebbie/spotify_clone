'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Song, {
        foreignKey: 'songId'
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  };
  Interaction.init({
    userId:{
      field:"user_id",
      type:DataTypes.INTEGER
    },
    songId:{
      field:"song_id",
      type:DataTypes.INTEGER
    },
    playCount:{
      field:"play_count",
      type:DataTypes.INTEGER
    },
    liked: DataTypes.BOOLEAN
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Interaction',
  });
  return Interaction;
};