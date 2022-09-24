'use strict';


module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define('materia', {
    nombre: DataTypes.STRING,
    id_carrera: DataTypes.INTEGER,
    id_profesor: DataTypes.INTEGER
  }, {});

  
  materia.associate = (models) => {
    materia.belongsTo(models.profesor, { foreignKey: 'id_profesor' });
  }

  return materia;
};
