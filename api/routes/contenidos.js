const express = require("express");
const router = express.Router();
const models = require("../models");
const contenido = require("../models/contenido");

router.get("/", (req, res) => {
  models.contenido
    .findAll({
      attributes: ["id", "id_materia", "nombre"]
    })
    .then(contenidos => res.send(contenidos))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500)
    });
});


router.post("/", (req, res) => {
  models.contenido
    .create({ 
        id_materia: req.body.id_materia,
        nombre: req.body.nombre })
    .then(contenido => res.status(201).send({ id: contenido.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe contenido con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
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
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = contenidos =>
    contenidos
      .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existen otros contenidos con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findContenido(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
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
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
