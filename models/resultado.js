'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resultado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Resultado.belongsTo(models.Usuario);
      Resultado.belongsTo(models.Detalle);
      Resultado.belongsTo(models.Orden);
    }
  }
  Resultado.init({
    usuarioId: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    modificacion: DataTypes.DATE,
    valor: DataTypes.DOUBLE,
    detalleId: DataTypes.INTEGER,
    ordenId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Resultado',
    tableName: 'resultado',
    createdAt: 'fecha',
    updatedAt: 'modificacion',
  });
  return Resultado;
};