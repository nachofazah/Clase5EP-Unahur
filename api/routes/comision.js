const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", (req, res) => {
  models.comision
    .findAll({
      attributes: ["id", "nombre", "id_materia"]
    })
    .then(comision => res.send(comision))
    .catch((error) => {
      console.error(error)
      res.sendStatus(500)
    });
});

router.post("/", (req, res) => {
  models.comision
    .create({
      nombre: req.body.nombre,
      id_materia: req.body.id_materia
    })
    .then(comision => res.status(201).send({ id: comision.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otra comision con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
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
      console.error(error)
      res.sendStatus(500)
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
          res.status(400).send('Bad request: existe otra comision con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findComision(req.params.id, {
      onSuccess,
      onNotFound: () => res.sendStatus(404),
      onError: (error) => {
        console.error(error)
        res.sendStatus(500)
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
        console.error(error)
        res.sendStatus(500)
      }
    });
});

module.exports = router;
