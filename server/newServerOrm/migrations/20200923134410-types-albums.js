'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.changeColumn("Albums", "artist_id", {
      type: Sequelize.INTEGER,
      allowNull: false
    })
    await queryInterface.changeColumn("Albums", "name", {
      type: Sequelize.STRING,
      allowNull: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("Albums", "artist_id", {
      type: Sequelize.INTEGER,
      allowNull: true
    })
    await queryInterface.changeColumn("Albums", "name", {
      type: Sequelize.STRING,
      allowNull: true
    })
  }
};
