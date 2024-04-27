'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuario.belongsTo(models.Rol);
      Usuario.hasMany(models.Orden);
      Usuario.hasMany(models.Resultado);
      Usuario.hasMany(models.Muestra, {as: 'receptor'});
    }
    getFormattedDate(fecha) {
      const date = new Date(fecha);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate()+1;
      return `${day}/${month}/${year}`;
    }
  }
  Usuario.init({
    apellido: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING, 
      allowNull: false,
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
    creacion: DataTypes.DATE,
    modificacion: DataTypes.DATE,
    rolId: DataTypes.INTEGER  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuario',
    createdAt: 'creacion',
    updatedAt: 'modificacion',
  });
  return Usuario;
};