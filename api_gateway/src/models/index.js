import { Sequelize } from 'sequelize';

// Initialize Sequelize for PostgreSQL
export default sequelize = new Sequelize(process.env.POSTGRES_URI, {
    dialect: 'postgres'
});
