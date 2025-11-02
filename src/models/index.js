const { sequelize } = require('../config/sequelize');
const User = require('./User');


const models = {
  User,
  sequelize
};

module.exports = models;
