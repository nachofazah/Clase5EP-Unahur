const express = require("express");
const router = express.Router();
const models = require("../models");
const { errorControl } = require("../utils");

router.get("/", (req, res) => {
  models.carrera
    .findAll({
      attributes: ["id", "nombre"]
    })
    .then(carreras => {
      if (!carreras.length) {
        throw { message: 'No hay carreras', status: 204 };
      }
      res.send(carreras)
    })
    .catch(error => {
      errorControl(req, res, {
        service: 'Obtener carreras',
        feature: 'Carreras',
        message: error.message || 'No se encuentran carreras',
        status: error.status || 500
      });
    });
});

router.get("/materias", (req, res) => {
  const { query: { skip = 0, limit = 1 } } = req;
  models.carrera
    .findAll({
      attributes: ["id", "nombre"],
      include: [{
        model: models.materia, attributes: ["id", "nombre", "id_carrera"]
      }],
      offset: Number(skip),
      limit: Number(limit)
    })
    .then((carreras) => models.carrera.count()
      .then((count) => ({
        totalDeCarreras: count,
        skip: Number(skip),
        limit: Number(limit),
        carreras
      }))
    )
    .then((carrerasData) => res.send(carrerasData))
    .catch(error => {
      errorControl(req, res, {
        service: 'Obtener materias de carreras',
        feature: 'Carreras',
        message: error.message || 'No se encuentran materias de carreras',
        status: error.status || 500
      });
    });
});

router.post("/", (req, res) => {
  models.carrera
    .create({ nombre: req.body.nombre })
    .then(carrera => res.status(201).send({ id: carrera.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        throw { message: 'Bad request: existe otra carrera con el mismo nombre', status: 400 };
      }
      throw error;
    })
    .catch(error => {
      errorControl(req, res, {
        service: 'Creacion de una carrera',
        feature: 'Carreras',
        message: error.message || `Error al intentar insertar en la base de datos: ${error}`,
        status: error.status || 500
      });
    });
});

const findCarrera = (id, { onSuccess, onNotFound, onError }) => {
  models.carrera
    .findOne({
      attributes: ["id", "nombre"],
      where: { id }
    })
    .then(carrera => (carrera ? onSuccess(carrera) : onNotFound()))
    .catch(error => onError(error));
};

router.get("/:id", (req, res) => {
  findCarrera(req.params.id, {
    onSuccess: carrera => res.send(carrera),
    onNotFound: () => res.sendStatus(404),
    onError: (error) => {
      errorControl(req, res, {
        service: 'Obtencion de una carrera',
        feature: 'Carreras',
        message: error.message || 'No se encuentra la carrera',
        status: error.status || 500
      });
    }
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = carrera =>
    carrera
      .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          throw { message: 'Bad request: existe otra carrera con el mismo nombre', status: 400 };
        }
        throw error;
      });
    findCarrera(req.params.id, {
      onSuccess,
      onNotFound: () => res.sendStatus(404),
      onError: (error) => {
        errorControl(req, res, {
          service: 'Edicion de una carrera',
          feature: 'Carreras',
          message: error.message || `Error al intentar actualizar la base de datos: ${error}`,
          status: error.status || 500
        });
      }
    });
});

router.delete("/:id", (req, res) => {
  const onSuccess = carrera =>
    carrera
      .destroy()
      .then(() => res.sendStatus(200));
  findCarrera(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: (error) => {
      errorControl(req, res, {
        service: 'Eliminacion de una carrera',
        feature: 'Carreras',
        message: error.message || `Error al intentar actualizar la base de datos: ${error}`,
        status: error.status || 500
      });
    }
  });
});

module.exports = router;
