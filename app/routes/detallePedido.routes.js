module.exports = app => {
    const detallePedido = require("../controllers/detallePedido.controller.js");
    var router = require("express").Router();
    // Create a new Pedido
    router.post("/create/", detallePedido.create);
    // Retrieve all Producto
    router.get("/", detallePedido.findAll);
    // Retrieve all published Producto
  
    // Retrieve a single Producto with id
    router.get("/:id", detallePedido.findOne);
    // Update a Producto with id
    router.put("/update/:id", detallePedido.update);
    // Delete a Producto with id
    router.delete("/delete/:id", detallePedido.delete);
    // Delete all Producto
    router.delete("/delete/", detallePedido.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/pedido/
    app.use("/api/detallePedidos", router);
};