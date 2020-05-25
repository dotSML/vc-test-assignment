const Sequelize = require("sequelize");

const sequelize = new Sequelize("test_assignment", "root", "test12345", {
    dialect: "mysql",
    host: "localhost"
});

module.exports = sequelize;