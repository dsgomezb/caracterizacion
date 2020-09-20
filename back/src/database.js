const { Pool } = require('pg');
const { promisify } = require('util');
const { database } = require('./keys');

const pool = new Pool(database);

pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }else{
        return console.log('Conexión Exitosa!!');
    }

  });

// promisyfy pool querys
pool.query = promisify(pool.query);

module.exports = pool;