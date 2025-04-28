const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Milestone = sequelize.define('Milestone', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'paid'),
    defaultValue: 'pending'
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  contractId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Contracts',
      key: 'id'
    }
  }
});

module.exports = Milestone;