const db = require("../models");
const Arte = db.artes;

// Create and Save a new Arte
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nome) {
    res.status(400).send({ message: "Conteudo não pode ser vazio!" });
    return;
  }

  // Create a Arte
  const arte = new Arte({
    nome: req.body.nome,
    descricao: req.body.descricao,
    preco: req.body.preco,
    image: req.body.image,
    published: req.body.published ? req.body.published : false
  });

  // Save Arte in the database
  arte
    .save(arte)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorrou enquanto criamos o registro de arte."
      });
    });
};

// Retrieve all arte from the database.
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { $regex: new RegExp(nome), $options: "i" } } : {};

  Arte.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving arte."
      });
    });
};

// Find a single Arte with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Arte.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Nenhum arte encontrada com o id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error para pegar a arte=" + id });
    });
};

// Update a Arte by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dado para atualizar não pode ser em branco!"
    });
  }

  const id = req.params.id;

  Arte.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Arte with id=${id}. Maybe Arte was not found!`
        });
      } else res.send({ message: "Arte was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Arte with id=" + id
      });
    });
};

// Delete a Arte with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Arte.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Arte with id=${id}. Maybe Arte was not found!`
        });
      } else {
        res.send({
          message: "Arte was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Arte with id=" + id
      });
    });
};

// Delete all Arte from the database.
exports.deleteAll = (req, res) => {
  Arte.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Arte were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Arte."
      });
    });
};

// Find all published Arte
exports.findAllPublished = (req, res) => {
  Arte.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving arte."
      });
    });
};
