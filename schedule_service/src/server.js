import express, { json } from 'express';
import cors from 'cors';
import { Sequelize } from 'sequelize';
import scheduleRoutes from './routes/schedule.routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// PostgreSQL connection setup
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/schedule_db', {
  dialect: 'postgres',
  logging: false, // Set to console.log to see SQL queries
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use('/api/schedules', scheduleRoutes);

// Database connection and server startup
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL database');

    // Sync models with database (if you're using Sequelize models)
    // await sequelize.sync(); // Use { force: true } to recreate tables (careful in production!)

    // Start server
    app.listen(PORT, () => {
      console.log(`Schedule service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
startServer();

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing HTTP server and database connection');
  sequelize.close()
    .then(() => {
      process.exit(0);
    });
});