const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Projects = sequelize.define('Projects', {
  img: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      const raw = this.getDataValue('img');
      return raw ? JSON.parse(raw) : [];
    },
    set(value) {
      this.setDataValue('img', JSON.stringify(value));
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  lang: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      const raw = this.getDataValue('lang');
      return raw ? JSON.parse(raw) : [];
    },
    set(value) {
      this.setDataValue('lang', JSON.stringify(value));
    },
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullDesc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  webLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  githubLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  timestamps: true,
});

module.exports = Projects;
