import express from 'express';
import mongoose from 'mongoose';
import dotenv from '../.env';
import authRoutes from './routes/auth.routes.js';

dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); // Enable JSON body parsing

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Mount the auth routes
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});