'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Personal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Personal.belongsTo(models.Rol, {
        foreignKey: 'rolId',
        as: 'rol'
      })
    }
  }
  Personal.init({
    apellido: DataTypes.STRING,
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    creacion: DataTypes.DATE,
    modificacion: DataTypes.DATE,
    rolId: DataTypes.INTEGER  }, {
    sequelize,
    modelName: 'Personal',
    createdAt: 'creacion',
    updatedAt: 'modificacion',
  });
  return Personal;
};