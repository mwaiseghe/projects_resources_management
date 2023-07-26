const mssql = require('mssql');
const dotenv = require('dotenv');
dotenv.config();

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: "localhost",
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: false
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

const poolPromise = new mssql.ConnectionPool(sqlConfig)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool;
    }
    )
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
    mssql, poolPromise
};