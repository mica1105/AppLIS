'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EstadoMuestra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EstadoMuestra.hasOne(models.Muestra);
    }
  }
  EstadoMuestra.init({
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EstadoMuestra',
    tableName: 'estadomuestra',
    timestamps: false,
  });
  return EstadoMuestra;
};