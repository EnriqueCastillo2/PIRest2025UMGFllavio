//Utilizamos module.export para exportar objetos para que puedan ser utilizados en otras clases
module.exports = (sequelize, Sequelize) => {
// usamos el sequelize.defina para "definir" el nombre de la entity en la BD, en este caso "cliente"
// Usamos type.Sequelize para definir el tipo de datos de cada atributo de la entidad 
    const Pedido = sequelize.define("pedido", {
        fecha: {
            type: Sequelize.DATEONLY,
           
        },
        total: {
            type: Sequelize.DOUBLE
            
        },
        id_cliente: {
            type: Sequelize.INTEGER,
            
    }
});
  Pedido.associate=(models)=>{
    Pedido.belongsTo(models.clientes,{
        foreignKey: 'id_cliente',
        as: 'cliente',
       
    }); Pedido.hasMany(models.detalle_pedido, {
    foreignKey: 'id_pedido',
    as: 'detalles'
  });
  };
    
    return Pedido;
};