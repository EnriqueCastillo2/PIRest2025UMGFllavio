module.exports = app => {
    const comentario = require("../controllers/comentario.controller.js");
    var router = require("express").Router();
    // Create a new Client
    router.post("/create/", comentario.create);
    // Retrieve all Client
    router.get("/", comentario.findAll);
    // Retrieve all published Client
   
    
    app.use("/api/comentario", router);
};