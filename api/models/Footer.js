const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Footer = sequelize.define('Footer', {
  creator: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  resumeLink: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  githubLink: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  linkedinLink: { 
  type: DataTypes.STRING,
  allowNull: false,
},

}, {
  timestamps: true,
});

module.exports = Footer;
