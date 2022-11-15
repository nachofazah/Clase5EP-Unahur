const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/", (req, res) => {
  models.materia
    .findAll({
      attributes: ["id", "nombre", "id_carrera", "id_profesor"]
    })
    .then(materias => res.send(materias))
    .catch((error) => {
      console.error(error)
      res.sendStatus(500)
    });
});

router.get("/contenidos", (req, res) => {
  models.contenido
    .findAll({
      attributes: ["id", "nombre", "id_materia"]
    })
    .then(contenidos => res.send(contenidos))
    .catch(() => res.sendStatus(500));
});

router.get("/comisiones", (req, res) => {
    models.comision
      .findAll({
        attributes: ["id", "nombre", "id_materia"]
      })
      .then(comisiones => res.send(comisiones))
      .catch((error) => {
        console.log(error)
        res.sendStatus(500)
      });
  });

router.get("/info", (req, res) => {
  const { query: { skip = 0, limit = 10 } } = req;
  models.materia
    .findAll({
      attributes: ["id", "nombre", "id_carrera", "id_profesor"],
      include: [{
        model: models.carrera, attributes: ["id", "nombre"]
      },{
        model: models.profesor, attributes: ["id", "nombre"]
      },{
        model: models.comision, attributes: ["id", "nombre"]
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
    .catch((error) => {
      console.error(error)
      res.sendStatus(500)
    });
});


router.post("/", (req, res) => {
  models.materia
    .create({
      nombre: req.body.nombre,
      id_carrera: req.body.id_carrera,
      id_profesor: req.body.id_profesor
    })
    .then(materia => res.status(201).send({ id: materia.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otra materia con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findMateria = (id, { onSuccess, onNotFound, onError }) => {
  models.materia
    .findOne({
      attributes: ["id", "nombre", "id_carrera", "id_profesor"],
      where: { id }
    })
    .then(materia => (materia ? onSuccess(materia) : onNotFound()))
    .catch((error) => onError(error));
};

router.get("/:id", (req, res) => {
  findMateria(req.params.id, {
    onSuccess: materia => res.send(materia),
    onNotFound: () => res.sendStatus(404),
    onError: (error) => {
      console.error(error)
      res.sendStatus(500)
    }
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = materia =>
    materia
      .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra materia con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findMateria(req.params.id, {
      onSuccess,
      onNotFound: () => res.sendStatus(404),
      onError: (error) => {
        console.error(error)
        res.sendStatus(500)
      }
    });
});

router.delete("/:id", (req, res) => {
  const onSuccess = materia =>
    materia
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
    findMateria(req.params.id, {
      onSuccess,
      onNotFound: () => res.sendStatus(404),
      onError: (error) => {
        console.error(error)
        res.sendStatus(500)
      }
    });
});



module.exports = router;
