'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoMuestra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TipoMuestra.hasOne(models.Muestra);
    }
  }
  TipoMuestra.init({
    tipo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TipoMuestra',
    tableName: 'tipomuestra',
    timestamps: false,
  });
  return TipoMuestra;
};