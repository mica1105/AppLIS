'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resultado extends Model {
    static associate(models) {
      Resultado.belongsTo(models.Usuario);
      Resultado.belongsTo(models.Detalle);
      Resultado.belongsTo(models.Determinacion);
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
  Resultado.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    modificacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    determinacionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    detalleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Resultado',
    tableName: 'resultado',
    createdAt: 'fecha',
    updatedAt: 'modificacion',
  });
  return Resultado;
};