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
  userId: { // Ensure this field exists
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  }
});

// Define relationships
Book.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Book, { foreignKey: 'userId' });

export default Book;