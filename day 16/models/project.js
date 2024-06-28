'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  project.init({
    title: DataTypes.STRING,
    startdate: DataTypes.STRING,
    enddate: DataTypes.STRING,
    content: DataTypes.STRING,
    technologies: DataTypes.STRING,
    image: DataTypes.STRING,
    author: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'project',
  });
  return project;
};