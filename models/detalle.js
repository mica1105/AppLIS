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
      Detalle.belongsTo(models.Muestra);
      Detalle.hasMany(models.Resultado);
    }
  }
  Detalle.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    examenId: DataTypes.INTEGER,
    ordenId: DataTypes.INTEGER,
    muestraId: DataTypes.INTEGER,
    validado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Detalle',
    tableName: 'detalle',
    timestamps: false,
  });
  return Detalle;
};