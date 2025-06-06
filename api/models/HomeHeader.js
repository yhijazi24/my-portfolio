const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const HomeHeader = sequelize.define('HomeHeader', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  titleFr: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  aboutMe: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  aboutMeFr: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  frenchResumeImg: {
  type: DataTypes.STRING,
  allowNull: true,
},
englishResumeImg: {
  type: DataTypes.STRING,
  allowNull: true,
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
