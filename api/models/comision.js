'use strict';
module.exports = (sequelize, DataTypes) => {
  const comision = sequelize.define('comision', {
    nombre: DataTypes.STRING,
    id_materia: DataTypes.INTEGER
  }, {});

  comision.associate = (models) => {
    comision.belongsTo(models.materia, { foreignKey: 'id_materia', as: 'comisionesDeMateria' });
    // comision.hasMany(models.comisionAlumno, { foreignKey: 'id_comision', as: 'comisionesDeAlumnoDeComision' });
  }
  
  return comision;
};
