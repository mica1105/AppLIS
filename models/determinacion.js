'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Determinacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Determinacion.hasMany(models.Referencia);
      Determinacion.hasMany(models.Resultado);
      Determinacion.belongsTo(models.Examen);
    }
  }
  Determinacion.init({
    dato: DataTypes.STRING,
    medida: DataTypes.STRING,
    examenId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Determinacion',
    tableName:'determinacion',
    timestamps: false,
  });
  return Determinacion;
};