module.exports = {
    HOST: "ep-calm-sunset-afofsblp-pooler.c-2.us-west-2.aws.neon.tech",
    USER: "neondb_owner",
    PASSWORD: "npg_W8rhnkEjgpz0",
    DB: "neondb",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}