
module.exports = {
    //Local
    database: {
        host: 'localhost',
        user: 'postgres',
        password: 'postgres',
        database: 'caracterizacion',
        port: 5432

    },
    //Produccion
    /*database: {
        host: 'localhost',
        user: 'lodon',
        password: 'london2020',
        database: 'paseando_tu_mascota'
    },*/
    data_email:{
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: 'noreponderpaseando@gmail.com',
          pass: 'noresponder2020*'
        }
    }
};
/*
//Produccion
module.exports = {
    database: {
        host: '31.220.56.195',
        user: 'paseando',
        password: 'paseando2020*',
        database: 'paseando_tu_mascota'
    }
};*/