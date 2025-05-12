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
  resumeImg: {
    type: DataTypes.TEXT,
    allowNull: true,  // allow it to be null initially
    get() {
      const raw = this.getDataValue('resumeImg');
      return raw ? JSON.parse(raw) : [];
    },
    set(value) {
      this.setDataValue('resumeImg', JSON.stringify(value));
    },
  },
  frenchResumeLink: {
    type: DataTypes.STRING,
    allowNull: true,  // allow null if not set yet
  },
  englishResumeLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = HomeHeader;
