'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Muestra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Muestra.belongsTo(models.Tipo);
      Muestra.belongsTo(models.Usuario);
      Muestra.belongsTo(models.Orden);
      Muestra.hasMany(models.Detalle);
      Muestra.belongsTo(models.EstadoMuestra);
    }
    getFormattedDate(fecha) {
      if (!(fecha instanceof Date) || isNaN(fecha)) {
          return 'Fecha inválida';
      }
      const dia = fecha.getDate().toString().padStart(2, '0');
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
      const año = fecha.getFullYear();
      return `${dia}-${mes}-${año}`;
    }
  }
  Muestra.init({
    tipoId: DataTypes.INTEGER,
    estadoMuestraId: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    usuarioId: DataTypes.INTEGER,
    ordenId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Muestra',
    tableName: 'muestra',
    createdAt: 'fecha',
    updatedAt: false,
  });
  return Muestra;
};