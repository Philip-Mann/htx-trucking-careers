'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Companies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Companies.init({
    companyName: DataTypes.STRING,
    pay: DataTypes.STRING,
    jobType: DataTypes.STRING,
    trailerType: DataTypes.STRING,
    experienceRequirement: DataTypes.STRING,
    willTrain: DataTypes.BOOLEAN,
    headquarters: DataTypes.STRING,
    homeTime: DataTypes.STRING,
    endorsements: DataTypes.STRING,
    companySite: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Companies',
  });
  return Companies;
};