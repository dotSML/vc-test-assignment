const bcrypt = require("bcryptjs");
("use strict");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("users", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        }
      })
      .then(result => {
        return bcrypt.hash("nonhashedpassword", 12);
      })
      .then(hashedpw => {
        queryInterface.bulkInsert("users", [
          {
            firstName: "Test",
            lastName: "Kasutaja",
            email: "test@kasutaja.ee",
            password: hashedpw
          }
        ]);
      });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable("users");
  }
};
