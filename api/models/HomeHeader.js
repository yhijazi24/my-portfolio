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
  allowNull: false,
  get() {
    const raw = this.getDataValue('resumeImg');
    try {
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error('⚠️ Failed to parse resumeImg:', raw, err.message);
      return [];
    }
  },
  set(value) {
    if (Array.isArray(value)) {
      this.setDataValue('resumeImg', JSON.stringify(value));
    } else {
      console.error('⚠️ resumeImg must be an array');
    }
  }
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
