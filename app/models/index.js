// usamos la función requiere para cargar el modulo db.config.js para traer los parametros preconfigurados de la BD
const dbConfig = require("../config/db.config.js");
// cargamos el modulo sequelize "ORM" para el manejo de las entidades como objetos. 
const Sequelize = require("sequelize");
// creamos una variable sequelize y la inicializamos como un Objeto Sequelize con la informacion de la BD 

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    ssl: {
      require: true,              // Indica que la conexión debe usar SSL obligatoriamente
      rejectUnauthorized: false   // Acepta certificados autofirmados o no verificados (útil en entornos no productivos)
    }
  },
    // Configuración del pool de conexiones para optimizar el rendimiento
  pool: {
    max: dbConfig.pool.max,       // Máximo de conexiones simultáneas
    min: dbConfig.pool.min,       // Mínimo de conexiones
    acquire: dbConfig.pool.acquire, // Tiempo máximo para obtener una conexión antes de lanzar error
    idle: dbConfig.pool.idle      // Tiempo que una conexión puede estar inactiva antes de ser liberada
  }
});
// creamos un objeto ddb
const db = {};
// la variable db.Sequelize = modulo importado Sequelize que esta declarado previamente donde se importa el modulo
db.Sequelize = Sequelize;
// se define una variable con la configuracion de sequelize
db.sequelize = sequelize;
// se crea una variable clientes que importa el modelo que esta dentro de la carpeta models/cliente.model.js

db.comentario =  require("./comentario.model.js")(sequelize,Sequelize);
// puede seguir agregando mas modelos e importarlos de la seguiente manera
//db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
// se utiliza el export para que el objeto db pueda ser accedio a travez de otras clases. 

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

module.exports = db;