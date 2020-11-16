"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Songs", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: true,
      validate: {},
    });
    await queryInterface.addColumn("Albums", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: true,
      validate: {},
    });
    await queryInterface.addColumn("Artists", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: true,
      validate: {},
    });
    await queryInterface.addColumn("Interactions", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: true,
      validate: {},
    });
    await queryInterface.addColumn("Playlists", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: true,
      validate: {},
    });
    await queryInterface.addColumn("Playlists_songs", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: true,
      validate: {},
    });
    await queryInterface.addColumn("Users", "deletedAt", {
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
    await queryInterface.removeColumn("Aongs", "deletedAt");
    await queryInterface.removeColumn("Artists", "deletedAt");
    await queryInterface.removeColumn("Albums", "deletedAt");
    await queryInterface.removeColumn("Users", "deletedAt");
    await queryInterface.removeColumn("Playlists", "deletedAt");
    await queryInterface.removeColumn("Interactions", "deletedAt");
    await queryInterface.removeColumn("Playlists_songs", "deletedAt");
  },
};
