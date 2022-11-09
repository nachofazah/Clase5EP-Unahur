'use strict';
module.exports = (sequelize, DataTypes) => {
  const comisionAlumno = sequelize.define('comisionAlumno', {
    nombreMateria: DataTypes.STRING
  }, {});
  comisionAlumno.associate = (models) => {
    // comisionAlumno.belongsTo(models.alumno, { foreignKey: 'id_alumno', as: 'comisionesDeAlumnoDeAlumno' });
    // comisionAlumno.belongsTo(models.comision, { foreignKey: 'id_comision', as: 'comisionesDeAlumnoDeComision' });
  };
  return comisionAlumno;
};
