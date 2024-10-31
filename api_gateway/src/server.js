const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware
const authMiddleware = require('./middleware/auth.middleware');

// Routes
const routes = require('./routes');

// Use middleware
app.use(authMiddleware);

// Set up routes
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
