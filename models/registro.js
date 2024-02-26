'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Registro.belongsTo(models.Orden);
      Registro.belongsTo(models.Resultado);
    }
  }
  Registro.init({
    archivo: DataTypes.STRING,
    ordenId: DataTypes.INTEGER,
    resultadoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Registro',
    tableName: 'registro',
    timestamps: false,
  });
  return Registro;
};