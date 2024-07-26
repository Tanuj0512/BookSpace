import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize('books', 'root', 'T@nuj123', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;

