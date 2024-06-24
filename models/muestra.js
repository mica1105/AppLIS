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
    }
    getFormattedDate(fecha) {
      return `${fecha.getDate().toString().padStart(2, '0')}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getFullYear()}`;
    }
  }
  Muestra.init({
    tipoId: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN,
    fecha: DataTypes.DATE,
    usuarioId: DataTypes.INTEGER,
    ordenId: DataTypes.INTEGER,
    etiqueta: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Muestra',
    tableName: 'muestra',
    createdAt: 'fecha',
    updatedAt: false,
  });
  return Muestra;
};