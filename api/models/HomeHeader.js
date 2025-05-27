const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const HomeHeader = sequelize.define('HomeHeader', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  aboutMe: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  frenchResumeImg: {
  type: DataTypes.STRING,
  allowNull: false,
},
englishResumeImg: {
  type: DataTypes.STRING,
  allowNull: false,
},

  frenchResumeLink: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  englishResumeLink: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = HomeHeader;
