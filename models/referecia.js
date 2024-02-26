'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Referecia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Referecia.hasMany(models.Examen);
    }
  }
  Referecia.init({
    edad: DataTypes.INTEGER,
    sexo: DataTypes.STRING,
    min: DataTypes.DOUBLE,
    max: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Referecia',
    tableName: 'referencia',
    timestamps: false,
  });
  return Referecia;
};