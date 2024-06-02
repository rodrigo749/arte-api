const db = require("../models");
const Categoria = db.categorias;

// Create and Save a new Categoria
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nome) {
    res.status(400).send({ message: "Conteudo não pode ser vazio" });
    return;
  }

  // Create a Categoria
  const categoria = new Categoria({
    nome: req.body.nome
  });

  // Save Categoria in the database
  categoria
    .save(categoria)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the categoria."
      });
    });
};

// Retrieve all Categorias from the database.
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { $regex: new RegExp(nome), $options: "i" } } : {};

  Categoria.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categoriass."
      });
    });
};

// Find a single Categoria with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Categoria.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Categoria with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Categoria with id=" + id });
    });
};

// Update a Categoria by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Categoria.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Categoria with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Categoria.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Categoria with id=${id}. Maybe Categoria was not found!`
        });
      } else {
        res.send({
          message: "Categoria was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Categoria with id=" + id
      });
    });
};

// Delete all Categorias from the database.
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Categorias were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Categorias."
      });
    });
};

// Find all published Categorias
exports.findAllPublished = (req, res) => {
  Tutorial.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Categorias."
      });
    });
};
