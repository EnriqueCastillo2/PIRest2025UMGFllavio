const db = require("../models");
const detallePedido = db.detalle_pedido;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validar datos obligatorios
  if (
    !req.body.cantidad ||
    !req.body.subtotal ||
    !req.body.id_producto ||
    !req.body.id_pedido
  ) {
    return res.status(400).send({
      message: "Datos incompletos."
    });
  }

  // Crear objeto
  const detallepedido = {
    cantidad: req.body.cantidad,
    subtotal: req.body.subtotal,
    id_producto: req.body.id_producto,
    id_pedido: req.body.id_pedido
  };

  // Guardar en la BD
  detallePedido.create(detallepedido)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear el detalle del pedido."
      });
    });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    detallePedido.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving detalle_pedido."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    detallePedido.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving detalle_pedido with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    detallePedido.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "detalle_pedido was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update detalle_pedido with id=${id}. Maybe detalle_pedido was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating detalle_pedido with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    // utilizamos el metodo destroy para eliminar el objeto mandamos la condicionante where id = parametro que recibimos 
    detallePedido.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "detalle_pedido was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete detalle_pedido with id=${id}. El detalle_pedido no fue encontado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete detalle_pedido with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    detallePedido.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} detalle_pedido were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all detalle_pedido."
            });
        });
};