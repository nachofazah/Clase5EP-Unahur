'use strict';
module.exports = (sequelize, DataTypes) => {
  const comisionAlumno = sequelize.define('comisionAlumno', {
    nombreMateria: DataTypes.STRING
  }, {});
  comisionAlumno.associate = (models) => {
    comisionAlumno.belongsTo(models.alumno, { foreignKey: 'id_alumno' });
    comisionAlumno.belongsTo(models.comision, { foreignKey: 'id_comision' });
  };
  return comisionAlumno;
};
