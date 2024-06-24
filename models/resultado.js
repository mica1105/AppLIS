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
  }
  Resultado.init({
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    modificacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    detalleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    determinacionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: true
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