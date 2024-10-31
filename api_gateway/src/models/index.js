const { Sequelize } = require('sequelize');

// Initialize Sequelize for PostgreSQL
const sequelize = new Sequelize(process.env.POSTGRES_URI, {
    dialect: 'postgres'
});

module.exports = { sequelize };
