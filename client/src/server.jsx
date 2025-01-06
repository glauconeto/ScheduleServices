import express, { static as _static } from 'express';
import { join } from 'path';
import cors from 'cors';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(_static(join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app