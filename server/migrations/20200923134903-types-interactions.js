"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.changeColumn("Interactions", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.changeColumn("Interactions", "song_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.changeColumn("Interactions", "liked", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.changeColumn("Interactions", "play_count", {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("Interactions", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn("Interactions", "song_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn("Interactions", "liked", {
      type: Sequelize.BOOLEAN,
    });
    await queryInterface.changeColumn("Interactions", "play_count", {
      type: Sequelize.INTEGER,
    });
  },
};
