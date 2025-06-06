const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const HomeProjects = sequelize.define('HomeProject', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   titleFr: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   subTitleFr: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.TEXT, // Store JSON array
    allowNull: false,
    get() {
      const raw = this.getDataValue('img');
      return raw ? JSON.parse(raw) : [];
    },
    set(value) {
      this.setDataValue('img', JSON.stringify(value));
    },
  },
}, {
  timestamps: true,
});

module.exports = HomeProjects;
