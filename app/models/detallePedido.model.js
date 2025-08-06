// Utilizamos module.exports para exportar el modelo
module.exports = (sequelize, Sequelize) => {
  const DetallePedido = sequelize.define("detalle_pedido", {
    cantidad: {
      type: Sequelize.INTEGER,
    
    },
    subtotal: {
      type: Sequelize.DOUBLE,
    
    },
    id_pedido: {
      type: Sequelize.INTEGER,
     
    },
    id_producto: {
      type: Sequelize.INTEGER,

    }
  });

  // Asociaciones
  DetallePedido.associate = (models) => {
    DetallePedido.belongsTo(models.pedido, {
      foreignKey: 'id_pedido',
      as: 'pedido'
    });

    DetallePedido.belongsTo(models.productos, {
      foreignKey: 'id_producto',
      as: 'producto'
    });
  };

  return DetallePedido;
};
