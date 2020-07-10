const { Sequelize, DataTypes } = require('sequelize');
import { sequelize } from '../db'

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  github_id: {
    type: DataTypes.INTEGER,
  },
  kakao_id: {
    type: DataTypes.INTEGER,
  }
}, {
  sequelize,
  modelName: 'User',
  timestamps: false
})

export default User;