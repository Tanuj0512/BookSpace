import express from 'express';
import cors from 'cors';
import path from 'path';
import sequelize from './db.js';
import bookRoute from './route/book.route.js';
import userRoute from './route/user.route.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Adjust as needed
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

sequelize.authenticate()
  .then(() => console.log('Connected to MySQL'))
  .catch(error => console.error('Database connection error:', error));

sequelize.sync()
  .then(() => console.log('Models synchronized with MySQL'))
  .catch(error => console.error('Error syncing models:', error));

app.use('/api', bookRoute);
app.use('/user', userRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
