const mysql = require('mysql');
const {promisify} = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, conect) => {
    if(err){
        console.log('error de conexion de database');
    }else{
        if(conect) conect.release();
        console.log('DB conectada');
    }
})

pool.query = promisify(pool.query);
module.exports = pool;