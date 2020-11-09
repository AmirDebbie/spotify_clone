"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("songs", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: true,
      validate: {},
    });
    await queryInterface.addColumn("albums", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: true,
      validate: {},
    });
    await queryInterface.addColumn("artists", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: true,
      validate: {},
    });
    await queryInterface.addColumn("interactions", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: true,
      validate: {},
    });
    await queryInterface.addColumn("playlists", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: true,
      validate: {},
    });
    await queryInterface.addColumn("playlists_songs", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: true,
      validate: {},
    });
    await queryInterface.addColumn("users", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: true,
      validate: {},
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await  queryInterface.removeColumn('songs', 'deletedAt');
    await  queryInterface.removeColumn('artists', 'deletedAt');
    await  queryInterface.removeColumn('albums', 'deletedAt');
    await  queryInterface.removeColumn('users', 'deletedAt');
    await  queryInterface.removeColumn('playlists', 'deletedAt');
    await  queryInterface.removeColumn('interactions', 'deletedAt');
    await  queryInterface.removeColumn('playlists_songs', 'deletedAt');

  },
};
