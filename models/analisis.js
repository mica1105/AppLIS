'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Analisis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Analisis.hasOne(models.Examen);
      Analisis.hasMany(models.Detalle);
    }
  }
  Analisis.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Analisis',
    tableName: 'analisis',
    timestamps: false,
  });
  return Analisis;
};