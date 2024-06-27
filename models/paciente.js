'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paciente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Paciente.hasMany(models.Orden);
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
  Paciente.init({
    dni: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    fechaNac: {
      type: DataTypes.DATE, 
      allowNull: false,
    },
    sexo:  {
      type: DataTypes.STRING, 
      allowNull: false
    },
    telefono: {
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    email:  {
      type: DataTypes.STRING, 
      validate: {isEmail: true},
      allowNull: false
    },
    password: {
      type: DataTypes.STRING, 
      allowNull: false
    },
   }, {
    sequelize,
    modelName: 'Paciente',
    tableName: 'paciente',
    timestamps: false,
  });
  return Paciente;
};