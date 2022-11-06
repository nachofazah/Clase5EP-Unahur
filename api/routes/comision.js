var express = require("express");
var router = express.Router();
var models = require("../models");
var utils = require("../utils");

router.get("/", (req, res) => {
  models.comision
    .findAll({
      attributes: ["id", "nombre", "id_materia"]
    })
    .then(comision => {
      if (!comision.length) {
        throw { message: 'No hay comisiones', status: 204 };
      }
      res.send(comision)
    })
    .catch(error => {
      utils.errorControl(req, res, {
        service: 'Obtener comisiones',
        feature: 'Comisiones',
        message: error.message || 'No se encuentran comisiones',
        status: error.status || 500
      });
    });
});

router.post("/", (req, res) => {
  models.comision
    .create({
       nombre: req.body.nombre,
       id_materia: req.body.id_materia })
    .then(comision => res.status(201).send({ id: comision.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        throw { message: 'Bad request: existe otra comision con el mismo nombre', status: 400 };
      }
      throw error;
    })
    .catch(error => {
      utils.errorControl(req, res, {
        service: 'Creacion de una comision',
        feature: 'Comision',
        message: error.message || `Error al intentar insertar en la base de datos: ${error}`,
        status: error.status || 500
      });
    });
});

const findComision = (id, { onSuccess, onNotFound, onError }) => {
  models.comision
    .findOne({
      attributes: ["id", "nombre", "id_materia"],
      where: { id }
    })
    .then(comision => (comision ? onSuccess(comision) : onNotFound()))
    .catch((error) => onError(error));
};

router.get("/:id", (req, res) => {
  findComision(req.params.id, {
    onSuccess: comision => res.send(comision),
    onNotFound: () => res.sendStatus(404),
    onError: (error) => {
      utils.errorControl(req, res, {
        service: 'Obtencion de una comision',
        feature: 'Comision',
        message: error.message || 'No se encuentra la comision',
        status: error.status || 500
      });
    }
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = comision =>
    comision
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
          service: 'Edicion de una comision',
          feature: 'Comision',
          message: error.message || `Error al intentar actualizar la base de datos: ${error}`,
          status: error.status || 500
        });
      }
    });
});

router.delete("/:id", (req, res) => {
  const onSuccess = comision =>
    comision
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
    findComision(req.params.id, {
      onSuccess,
      onNotFound: () => res.sendStatus(404),
      onError: (error) => {
        utils.errorControl(req, res, {
          service: 'Eliminacion de una comision',
          feature: 'Comision',
          message: error.message || `Error al intentar actualizar la base de datos: ${error}`,
          status: error.status || 500
        });
      }
    });
  });

module.exports = router;
