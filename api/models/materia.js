'use strict';
module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define('materia', {
    nombre: DataTypes.STRING,
    id_carrera: DataTypes.INTEGER
  }, {});

  materia.associate = (models) => {
    materia.belongsToMany(models.carrera, { through: "carreraMateria" });
  }

  return materia;
};
