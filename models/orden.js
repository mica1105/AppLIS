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
      Orden.hasMany(models.Muestra);
      Orden.belongsToMany(models.Examen,{through:'Detalle'});
      Orden.hasMany(models.Detalle);
    }
    getFormattedDate(fecha) {
      if (typeof fecha === 'string') {
          fecha = new Date(fecha);
      }
  
      if (!(fecha instanceof Date) || isNaN(fecha)) {
          return 'Fecha inválida';
      }
  
      const dia = fecha.getDate().toString().padStart(2, '0');
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
      const año = fecha.getFullYear();
      return `${dia}-${mes}-${año}`;
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