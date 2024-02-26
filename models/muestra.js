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
      Muestra.belongsTo(models.TipoMuestra);
      Muestra.belongsTo(models.Usuario);
      Muestra.hasMany(models.Detalle);
    }
  }
  Muestra.init({
    tipoMuetraId: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN,
    usuarioId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Muestra',
    tableName: 'muestra',
    timestamps: false,
  });
  return Muestra;
};