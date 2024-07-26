import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import User from './user.model.js';

const Book = sequelize.define('Book', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Book.belongsTo(User, { foreignKey: 'userId' });
// User.hasMany(Book, { foreignKey: 'userId' });

export default Book;
