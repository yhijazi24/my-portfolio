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
    type: DataTypes.TEXT, // We will store JSON stringified array
    allowNull: false,
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
