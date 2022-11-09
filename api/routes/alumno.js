const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", (req, res) => {
  models.alumno
    .findAll({
      attributes: ["id", "nombre"]
    })
    .then(alumno => res.send(alumno))
    .catch((error) => {
      console.error(error)
      res.sendStatus(500)
    });
});

router.post("/", (req, res) => {
  models.alumno
    .create({ nombre: req.body.nombre })
    .then(alumno => res.status(201).send({ id: alumno.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otro alumno con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findAlumno = (id, { onSuccess, onNotFound, onError }) => {
  models.alumno
    .findOne({
      attributes: ["id", "nombre"],
      where: { id }
    })
    .then(alumno => (alumno ? onSuccess(alumno) : onNotFound()))
    .catch((error) => onError(error));
};

router.get("/:id", (req, res) => {
  findAlumno(req.params.id, {
    onSuccess:alumno => res.send(alumno),
    onNotFound: () => res.sendStatus(404),
    onError: (error) => {
      console.error(error)
      res.sendStatus(500)
    }
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = alumno =>
  alumno
      .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otro alumno con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findAlumno(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: (error) => {
      console.error(error)
      res.sendStatus(500)
    }
  });
});

router.delete("/:id", (req, res) => {
  const onSuccess = alumno =>
  alumno
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findAlumno(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: (error) => {
      console.error(error)
      res.sendStatus(500)
    }
  });
});

module.exports = router;
