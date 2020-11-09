'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Playlists_song, {
        foreignKey: 'playlist_id'
      });
    }
  };
  Playlist.init({
    name: DataTypes.STRING,
    coverImg:{
      field:'cover_img',
      type:DataTypes.STRING, 
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Playlist',
  });
  return Playlist;
};