const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.listen(3000, () => {
    console.log('Auth service is running on port 3000');
});
