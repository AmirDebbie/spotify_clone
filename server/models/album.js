'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    static associate(models) {
      this.hasMany(models.Song, {
        foreignKey: 'albumId'
      });
      this.belongsTo(models.Artist, {
        foreignKey: 'artistId'
      });
    }
  };
  Album.init({
    artistId:{
      field:'artist_id',
      type: DataTypes.STRING
      },
    name: DataTypes.STRING,
    coverImg:{
      field:'cover_img',
      type:DataTypes.TEXT, 
    },
    uploadAt: {
      field: 'upload_at',
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Album',
  });
  return Album;
};