'use strict';
module.exports = (sequelize, DataTypes) => {
  const profesor = sequelize.define('profesor', {
    nombre: DataTypes.STRING
  }, {});

  profesor.associate = (models) => {
    profesor.hasMany(models.materia, { foreignKey: 'id_profesor' });
  }
  
  return profesor;
};
