//Librerias
const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./keys');
//Creación de conexion
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Conexion con database cerrada');
        }
        if(err.code === 'ER_CON_COUNT_ERROR '){
            console.error('DATABASE TO MANY CONNECTION');
        }
        if(err.code === 'ECONNREFUSED' ){
            console.error('La conexion con la DB fue rechasada');
        }
    }

    if(connection) connection.release();
        console.log('DB conectada');
        return;
});
pool.query = promisify(pool.query);
//Exportar conexion
module.exports = pool;