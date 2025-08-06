module.exports = app => {
    const pedido = require("../controllers/pedido.controller.js");
    var router = require("express").Router();
    // Create a new Pedido
    router.post("/create/", pedido.create);
    // Retrieve all Producto
    router.get("/", pedido.findAll);
    // Retrieve all published Producto
  
    // Retrieve a single Producto with id
    router.get("/:id", pedido.findOne);
    // Update a Producto with id
    router.put("/update/:id", pedido.update);
    // Delete a Producto with id
    router.delete("/delete/:id", pedido.delete);
    // Delete all Producto
    router.delete("/delete/", pedido.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/pedido/
    app.use("/api/pedidos", router);
};