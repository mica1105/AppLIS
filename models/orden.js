'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orden extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orden.belongsTo(models.Paciente);
      Orden.belongsTo(models.Usuario);
      Orden.belongsTo(models.Estado);
      Orden.belongsToMany(models.Examen,{through:'Detalle'});
      Orden.hasMany(models.Detalle);
      Orden.belongsToMany(models.Resultado, {through:'Registro'});
      Orden.hasMany(models.Registro);
    }
  }
  Orden.init({
    pacienteId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,
    estadoId: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    medico: DataTypes.STRING,
    diagnostico: DataTypes.STRING,
    fechaResultado: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Orden',
    tableName: 'orden',
    createdAt: 'fecha',
    updatedAt: false,
  });
  return Orden;
};