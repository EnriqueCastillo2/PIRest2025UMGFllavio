// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../models");
const Pedido = db.pedido;
const Op = db.Sequelize.Op;

// Create and Save a new Producto
// exports.create = async (req, res) => {
//     // Validamos que dentro del  request no venga vacio el nombre, de lo contrario returna error
//     if (!req.body.id_cliente) {
//         res.status(400).send({
//             message: "Content can not be empty!"
//         });
//         return;
//     }
//     const cliente = await Cliente.findByPk(req.body.id_cliente);
//     if (!cliente) {
//       return res.status(404).send({ message: `Cliente con ID ${req.body.id_cliente} no existe.` });
//     }

//     // Create a Client, definiendo una variable con la estructura del reques para luego solo ser enviada como parametro mas adelante. 
//     const pedido = {
//         fecha: req.body.fecha,
//         total: req.body.total,
//         id_cliente: req.body.id_cliente,
//     };

//     // Save a new Client into the database
//     Pedido.create(pedido)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while creating the Pedido."
//             });
//         });
// };
exports.create = async (req, res) => {
  const db = require("../models");
  const Pedido = db.pedido;
  const Cliente = db.clientes;

  try {
    // Validación básica
    if (!req.body.id_cliente || !req.body.fecha || !req.body.total) {
      return res.status(400).send({ message: "Datos incompletos." });
    }

    // Verifica que el cliente exista
    const cliente = await Cliente.findByPk(req.body.id_cliente);
    if (!cliente) {
      return res.status(404).send({ message: `Cliente con ID ${req.body.id_cliente} no existe.` });
    }

    // Crear pedido
    const pedido = await Pedido.create({
      fecha: req.body.fecha,
      total: req.body.total,
      id_cliente: req.body.id_cliente
    });

    res.status(201).send(pedido);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Ocurrió un error al crear el pedido."
    });
  }
};

// Retrieve all Pedido from the database.
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
     const db = require("../models");
    const Cliente = db.clientes;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Pedido.findAll({ where: condition ,
        include:{
            model:Cliente,
            as:"cliente"
        }

    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving pedido."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    const db = require("../models");
    const Cliente = db.clientes;

    Pedido.findByPk(id, {
        include: {
            model: Cliente,
            as: "cliente"
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Pedido with id=" + id
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Pedido.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pedido was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Pedido with id=${id}. Maybe Pedido was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Pedido with id=" + id
            });
        });
};

// Delete a Pedido with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    // utilizamos el metodo destroy para eliminar el objeto mandamos la condicionante where id = parametro que recibimos 
    Pedido.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pedido was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Pedido with id=${id}. El Pedido no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Pedido with id=" + id
            });
        });
};

// Delete all Pedido from the database.
exports.deleteAll = (req, res) => {
    Pedido.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Pedido were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all pedido."
            });
        });
};
