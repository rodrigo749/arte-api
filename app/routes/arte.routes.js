module.exports = app => {
    const artes = require("../controllers/arte.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Arte
    router.post("/", artes.create);
  
    // Retrieve all artes
    router.get("/", artes.findAll);
  
    // Retrieve all published artes
    router.get("/published", artes.findAllPublished);
  
    // Retrieve a single artes with id
    router.get("/:id", artes.findOne);
  
    // Update a artes with id
    router.put("/:id", artes.update);
  
    // Delete a artes with id
    router.delete("/:id", artes.delete);
  
    // Create a new artes
    router.delete("/", artes.deleteAll);
  
    app.use("/api/artes", router);
  };
  