'use strict';
module.exports = (sequelize, DataTypes) => {
  const alumno = sequelize.define('alumno', {
    nombre: DataTypes.STRING
  }, {});
  // alumno.associate = function(models) {
  //   // associations can be defined here
  // };
  return alumno;
};
