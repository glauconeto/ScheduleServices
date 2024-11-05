import express from 'express';
import { config } from 'dotenv';
import authMiddleware from './middleware/auth.middleware.js';
import routes from './routes/index.js'

config();

const app = express();

// Use middleware
app.use(authMiddleware);

// Set up routes
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
