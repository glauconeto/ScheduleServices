import express, { json, urlencoded, static } from 'express';
import { join } from 'path';
import cors from 'cors';
import { config } from 'dotenv';

// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(static(join(__dirname, 'public')));

// Serve the main application
app.get('/', (_req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something broke on the client server!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Client server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});
