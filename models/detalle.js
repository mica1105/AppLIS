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
      Detalle.belongsTo(models.Examen);
      Detalle.belongsTo(models.Orden);
      Detalle.hasOne(models.Resultado);
    }
  }
  Detalle.init({
    examenId: DataTypes.INTEGER,
    ordenId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Detalle',
    tableName: 'detalle',
    timestamps: false,
  });
  return Detalle;
};