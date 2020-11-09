'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("Users", "name", {
      type: Sequelize.STRING,
      allowNull: false
    })
    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    })
    await queryInterface.changeColumn("Users", "password", {
      type: Sequelize.STRING,
      allowNull: false,
      min: {
        args: 8,
        msg:"Minimum 8 characters required in password"
    }
    })
    await queryInterface.changeColumn("Users", "is_admin", {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })
    await queryInterface.changeColumn("users", "remember_token", {
      type:Sequelize.BOOLEAN,
      defaultValue: false
    })

    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("Users", "name", {
      type: Sequelize.STRING,
      allowNull: true
    })
    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING,
      allowNull: true,
    })
    await queryInterface.changeColumn("Users", "password", {
      type: Sequelize.STRING,
      allowNull: true
    })
    await queryInterface.changeColumn("Users", "is_admin", {
      type: Sequelize.BOOLEAN,
    })
    await queryInterface.changeColumn("users", "remember_token", {
      type:Sequelize.BOOLEAN,
    })
  }
};
