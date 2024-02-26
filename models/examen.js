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
      Examen.belongsTo(models.Referecia);
      Examen.belongsTo(models.Analisis);
      Examen.belongsTo(models.Orden);
      Examen.belongsToMany(models.Orden,{through: 'Detalle'});
      Examen.hasMany(models.Detalle);
    }
  }
  Examen.init({
    dato: DataTypes.STRING,
    valor: DataTypes.DOUBLE,
    referenciaId: DataTypes.INTEGER,
    medida: DataTypes.STRING,
    estado:DataTypes.BOOLEAN,
    fecha: DataTypes.DATE,
    analisisId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Examen',
    tableName:'examen',
    createdAt: 'fecha',
    updatedAt: false,
  });
  return Examen;
};