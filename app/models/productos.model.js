//Utilizamos module.export para exportar objetos para que puedan ser utilizados en otras clases
module.exports = (sequelize, Sequelize) => {
// usamos el sequelize.defina para "definir" el nombre de la entity en la BD, en este caso "producto"
// Usamos type.Sequelize para definir el tipo de datos de cada atributo de la entidad 
    const Producto = sequelize.define("producto", {
        nombre: {
            type: Sequelize.STRING
        },
        precio: {
            type: Sequelize.DOUBLE
        },
        stock: {
            type: Sequelize.INTEGER
        },
    });

    Producto.associate = (models) => {
  Producto.hasMany(models.detalle_pedido, {
    foreignKey: 'id_producto',
    as: 'detalles'
  });
};
    return Producto;

};