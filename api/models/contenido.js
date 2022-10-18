'use strict';
module.exports = (sequelize, DataTypes) => {
  const contenido = sequelize.define('contenido', {
    nombre: DataTypes.STRING,
    id_materia: DataTypes.INTEGER
  }, {});
  contenido.associate = function(models) {
    // associations can be defined here
  };
  return contenido;
};