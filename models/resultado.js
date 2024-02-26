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
      Resultado.belongsTo(models.Paciente);
      Resultado.belongsTo(models.Usuario);
      Resultado.belongsToMany(models.Orden, {through:'Registro'});
      Resultado.hasMany(models.Registro);
    }
  }
  Resultado.init({
    pacienteId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,
    fecha: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Resultado',
    tableName: 'resultado',
    createdAt: 'fecha',
    updatedAt: false,
  });
  return Resultado;
};