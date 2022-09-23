'use strict';
module.exports = (sequelize, DataTypes) => {
  const comision = sequelize.define('comision', {
    nombre: DataTypes.STRING,
    id_materia: DataTypes.INTEGER
  }, {});
  comision.associate = function(models) {
    // associations can be defined here
  };
  return comision;
};