module.exports = app => {
    const productos = require("../controllers/producto.controller.js");
    var router = require("express").Router();
    // Create a new Producto
    router.post("/create/", productos.create);
    // Retrieve all Producto
    router.get("/", productos.findAll);
    // Retrieve all published Producto
  
    // Retrieve a single Producto with id
    router.get("/:id", productos.findOne);
    // Update a Producto with id
    router.put("/update/:id", productos.update);
    // Delete a Producto with id
    router.delete("/delete/:id", productos.delete);
    // Delete all Producto
    router.delete("/delete/", productos.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/product", router);
};