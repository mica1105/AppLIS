'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tipo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tipo.hasOne(models.Muestra);
    }
  }
  Tipo.init({
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tipo',
    tableName: 'tipo',
    timestamps: false,
  });
  return Tipo;
};