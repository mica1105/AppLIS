'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Referencia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Referencia.belongsTo(models.Determinacion);
    }
  }
  Referencia.init({
    edad: DataTypes.INTEGER,
    sexo: DataTypes.STRING,
    min: DataTypes.FLOAT,
    max: DataTypes.FLOAT,
    determinacionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Referencia',
    tableName: 'referencia',
    timestamps: false,
  });
  return Referencia;
};