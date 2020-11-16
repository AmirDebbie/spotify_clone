"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Albums", "createdAt", "created_at");
    await queryInterface.renameColumn("Albums", "updatedAt", "updated_at");
    await queryInterface.renameColumn("Albums", "deletedAt", "deleted_at");
    await queryInterface.renameColumn("Artists", "createdAt", "created_at");
    await queryInterface.renameColumn("Artists", "updatedAt", "updated_at");
    await queryInterface.renameColumn("Artists", "deletedAt", "deleted_at");
    await queryInterface.renameColumn(
      "Interactions",
      "createdAt",
      "created_at"
    );
    await queryInterface.renameColumn(
      "Interactions",
      "updatedAt",
      "updated_at"
    );
    await queryInterface.renameColumn(
      "Interactions",
      "deletedAt",
      "deleted_at"
    );
    await queryInterface.renameColumn("Playlists", "createdAt", "created_at");
    await queryInterface.renameColumn("Playlists", "updatedAt", "updated_at");
    await queryInterface.renameColumn("Playlists", "deletedAt", "deleted_at");
    await queryInterface.renameColumn(
      "Playlists_songs",
      "createdAt",
      "created_at"
    );
    await queryInterface.renameColumn(
      "Playlists_songs",
      "updatedAt",
      "updated_at"
    );
    await queryInterface.renameColumn(
      "Playlists_songs",
      "deletedAt",
      "deleted_at"
    );
    await queryInterface.renameColumn("Songs", "createdAt", "created_at");
    await queryInterface.renameColumn("Songs", "updatedAt", "updated_at");
    await queryInterface.renameColumn("Songs", "deletedAt", "deleted_at");
    await queryInterface.renameColumn("Users", "createdAt", "created_at");
    await queryInterface.renameColumn("Users", "updatedAt", "updated_at");
    await queryInterface.renameColumn("Users", "deletedAt", "deleted_at");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Albums", "created_at", "createdAt");
    await queryInterface.renameColumn("Albums", "updated_at", "updatedAt");
    await queryInterface.renameColumn("Albums", "deleted_at", "deletedAt");
    await queryInterface.renameColumn("Artists", "created_at", "createdAt");
    await queryInterface.renameColumn("Artists", "updated_at", "updatedAt");
    await queryInterface.renameColumn("Artists", "deleted_at", "deletedAt");
    await queryInterface.renameColumn(
      "Interactions",
      "created_at",
      "createdAt"
    );
    await queryInterface.renameColumn(
      "Interactions",
      "updated_at",
      "updatedAt"
    );
    await queryInterface.renameColumn(
      "Interactions",
      "deleted_at",
      "deletedAt"
    );
    await queryInterface.renameColumn("Playlists", "created_at", "createdAt");
    await queryInterface.renameColumn("Playlists", "updated_at", "updatedAt");
    await queryInterface.renameColumn("Playlists", "deleted_at", "deletedAt");
    await queryInterface.renameColumn(
      "Playlists_songs",
      "created_at",
      "createdAt"
    );
    await queryInterface.renameColumn(
      "Playlists_songs",
      "updated_at",
      "updatedAt"
    );
    await queryInterface.renameColumn(
      "Playlists_songs",
      "deleted_at",
      "deletedAt"
    );
    await queryInterface.renameColumn("Songs", "created_at", "createdAt");
    await queryInterface.renameColumn("Songs", "updated_at", "updatedAt");
    await queryInterface.renameColumn("Songs", "deleted_at", "deletedAt");
    await queryInterface.renameColumn("Users", "created_at", "createdAt");
    await queryInterface.renameColumn("Users", "updated_at", "updatedAt");
    await queryInterface.renameColumn("Users", "deleted_at", "deletedAt");
  },
};
