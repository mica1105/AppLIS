'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detalle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Detalle.belongsTo(models.Analisis);
      Detalle.belongsTo(models.Examen);
      Detalle.belongsTo(models.Orden);
      Detalle.belongsTo(models.Muestra);
    }
  }
  Detalle.init({
    examenId: DataTypes.INTEGER,
    ordenId: DataTypes.INTEGER,
    analisisId: DataTypes.INTEGER,
    muestraId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Detalle',
    tableName: 'detalle',
    timestamps: false,
  });
  return Detalle;
};