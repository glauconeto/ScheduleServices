import express from 'express';
import { json } from 'body-parser';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(json());

app.use('/auth', authRoutes);

app.listen(3001, () => {
    console.log('Auth service is running on port 3001');
});
