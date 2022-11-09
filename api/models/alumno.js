'use strict';
module.exports = (sequelize, DataTypes) => {
  const alumno = sequelize.define('alumno', {
    nombre: DataTypes.STRING
  }, {});
  alumno.associate = (models) => {
    // alumno.hasMany(models.comisionAlumno, { foreignKey: 'id_alumno', as: 'comisionesDeAlumnoDeAlumno' });
  };
  return alumno;
};
