'use strict';
module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define('materia', {
    nombre: DataTypes.STRING,
    id_carrera: DataTypes.INTEGER
  }, {});

  materia.associate = (models) => {
    materia.hasMany(models.comision, {foreingkey: 'id_materia'})
  };
  return materia;
};
