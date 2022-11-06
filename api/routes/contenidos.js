var express = require("express");
var router = express.Router();
var models = require("../models");
var utils = require("../utils");

router.get("/", (req, res) => {
  models.contenido
    .findAll({
      attributes: ["id", "nombre", "id_materia"]
    })
    .then(contenido => {
      if (!contenido.length) {
        throw { message: 'No hay contenido', status: 204 };
      }
      res.send(contenido)
    })
    .catch(error => {
      utils.errorControl(req, res, {
        service: 'Obtener contenidos',
        feature: 'Contenido',
        message: error.message || 'No se encuentran contenidos',
        status: error.status || 500
      });
    });
});

router.post("/", (req, res) => {
  models.contenido
    .create({ 
      nombre: req.body.nombre,
      id_materia: req.body.id_materia })
    .then(contenido => res.status(201).send({ id: contenido.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        throw { message: 'Bad request: existe otro contenido con el mismo nombre', status: 400 };
      }
      throw error;
    })
    .catch(error => {
      utils.errorControl(req, res, {
        service: 'Creacion de un contenido',
        feature: 'Contenido',
        message: error.message || `Error al intentar insertar en la base de datos: ${error}`,
        status: error.status || 500
      });
    });
});

const findContenido = (id, { onSuccess, onNotFound, onError }) => {
    models.contenido
      .findOne({
        attributes: ["id", "id_materia", "nombre"],
        where: { id }
      })
      .then(contenido => (contenido ? onSuccess(contenido) : onNotFound()))
      .catch(() => onError());
  };

router.get("/:id", (req, res) => {
    findContenido(req.params.id, {
    onSuccess: contenidos => res.send(contenidos),
    onNotFound: () => res.sendStatus(404),
    onError: (error) => {
      utils.errorControl(req, res, {
        service: 'Obtencion de un contenido',
        feature: 'Contenido',
        message: error.message || 'No se encuentra el contenido',
        status: error.status || 500
      });
    }
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = contenidos =>
    contenidos
      .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          throw { message: 'Bad request: existe otra carrera con el mismo nombre', status: 400 };
        }
        throw error;
      });
  findComision(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: (error) => {
      utils.errorControl(req, res, {
        service: 'Edicion de un contenido',
        feature: 'Contenido',
        message: error.message || `Error al intentar actualizar la base de datos: ${error}`,
        status: error.status || 500
      });
    }
  });
});

router.delete("/:id", (req, res) => {
  const onSuccess = contenidos =>
    contenidos
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findContenido(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: (error) => {
      utils.errorControl(req, res, {
        service: 'Eliminacion de un contenido',
        feature: 'Contenidos',
        message: error.message || `Error al intentar actualizar la base de datos: ${error}`,
        status: error.status || 500
      });
    }
  });
});

module.exports = router;
