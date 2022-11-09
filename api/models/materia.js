'use strict';


module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define('materia', {
    nombre: DataTypes.STRING,
    id_carrera: DataTypes.INTEGER,
    id_profesor: DataTypes.INTEGER
  }, {});
  
  materia.associate = (models) => {
    materia.belongsTo(models.profesor, { foreignKey: 'id_profesor', as: 'materiasDeProfesor' });
    materia.belongsTo(models.carrera, { foreignKey: 'id_carrera', as: 'materiasDeCarrera' });
    materia.hasMany(models.comision, { foreingkey: 'id_materia', as: 'comisionesDeMateria' });
    // materia.hasMany(models.contenido, { foreingkey: 'id_materia', as: 'contenidosDeMateria' });
  }
  
  return materia;
};
