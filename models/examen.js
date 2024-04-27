'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Examen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Examen.hasMany(models.Determinacion);
      Examen.belongsToMany(models.Orden,{through: 'Detalle'});
      Examen.hasMany(models.Detalle);
    }
  }
  Examen.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Examen',
    tableName: 'examen',
    timestamps: false,
  });
  return Examen;
};