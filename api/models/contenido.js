'use strict';
module.exports = (sequelize, DataTypes) => {
  const contenido = sequelize.define('contenido', {
    nombre: DataTypes.STRING,
    id_materia: DataTypes.INTEGER
  }, {});
  contenido.associate = (models) => {
    contenido.belongsTo(models.materia, { foreignKey: 'id_materia' });
  };
  return contenido;
};
