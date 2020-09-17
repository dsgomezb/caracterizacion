const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isNotLoggedIn } = require('../lib/auth');
const pool = require('../database');
const helpers = require('../lib/helpers');
var nodemailer = require('nodemailer');
const { data_email } = require('../keys');
const admin = require("firebase-admin");
const serviceAccount = require("../credenciales-firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://paseandotumascota-b5559.firebaseio.com"
  });

//Ruta para registrar un nuevo usuario en la base de datos
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/users',
    failureRedirect: '/create',
    failureFlash: true,
}));

//Ruta para enviar notificación
router.post('/api/notification', async (req, res) => {
    let token = req.body.token
    try {
        let response = await admin.messaging().send({
            notification: {
                title: 'primera notificación',
                body: 'asdfasdfadsf'
            },
            token: token
        });
    
        return res.json(response)
    }catch(err){
        return res.json(err).status(500);
    }
});

//API Capturar id de usuario, consultar informacion de éste y enviarla al front para perfil
router.post('/api/get_info_user', async (req, res) => {
    const { user_id } = req.body;

    let profile = await pool.query('SELECT * FROM users \
                                    JOIN user_profile ON user_profile.id_user = users.id_user \
                                    WHERE users.id_user = ?',[user_id]);
    let profile_user = profile[0].id_profile;
    let rows;

    if(profile_user == 2){
        rows = await pool.query(' SELECT us.id_user as id_user, us.names, us.lastnames, us.document, us.email, us.phone,  us.address_walker, us.walker_time_availability, \
                                    barrio.cbar_cdigo as codigo_barrio, barrio.cbar_nmbre_cmuna as comuna, barrio.cbar_nmbre_brrio as nombre_barrio \
                                    FROM users AS us \
                                    INNER JOIN user_profile AS up ON us.id_user = up.id_user \
                                    INNER JOIN profile AS pro ON pro.id_profile = up.id_profile \
                                    LEFT JOIN comuna_barrio AS barrio ON barrio.cbar_cdigo = us.cbar_cdigo_walker \
                                    WHERE us.id_user = ?', [user_id]);
    }else{
        rows = await pool.query('SELECT us.id_user as id_user, us.names, us.lastnames, us.document, us.email, us.phone, \
                                    us_add.address_title as address_title, us_add.user_address as user_address, \
                                    us_add.description_user_address as description_user_address, \
                                    us_add.id_user_address, barrio.cbar_cdigo as codigo_barrio, barrio.cbar_nmbre_cmuna as comuna, \
                                    barrio.cbar_nmbre_brrio as nombre_barrio, us_add.status, us_add.id_user, mun.nombre_muni \
                                    FROM users AS us \
                                    INNER JOIN user_address AS us_add ON us.id_user = us_add.id_user \
                                    LEFT JOIN comuna_barrio AS barrio ON barrio.cbar_cdigo = us_add.cbar_cdigo \
                                    LEFT JOIN municipios AS mun ON mun.id_muni = us_add.id_muni WHERE us.id_user = ?', [user_id]);
    }

    if(rows.length > 0){
        const user = rows[0];
        data = {
            "code": "0",
            "data": user
        };
    }else{
        data = {
            "code": "1",
            "error": "El usuario no existe"
        };
    }
    res.status(200).json(data);
});

//API Actualizar información de usuario desde movil
router.post('/api/update_user_api', async (req, res) => {
    const { id_user, document, names, lastnames, email, phone } = req.body;
    const update_user = await pool.query('UPDATE users SET names = ?, lastnames = ?, document = ?, email = ?, phone = ? WHERE id_user = ?', [names, lastnames, document, email, phone, id_user]);
    if(update_user){
        let profile_user = await pool.query('SELECT * FROM user_profile WHERE id_user = ?',[id_user]);
        let profile;
        if(profile_user[0].id_profile == 2){
            profile = "paseador";
        }else{
            profile = "cliente";
        }
        console.log("entraa");
        // Inicio envio correo
        const transporter = nodemailer.createTransport({
            host: data_email.host,
            port: data_email.port,
            auth: {
                user: data_email.auth.user,
                pass: data_email.auth.pass,
            }
            });
        let last = lastnames ? lastnames: '';
        // Definimos el email
        var mailOptions = {
            from: 'no-responder',
            to: 'infopaseando@gmail.com',
            //to: 'danigb66@gmail.com',
            subject: 'Actualización '+profile+' '+names,
            attachments: [
                {
                filename: 'footer.jpg',
                path: 'src/public/img/correos/footer.jpg',
                cid: 'footer'
            }],
            html: ' <h1 style="text-align: center; color: #DA7F2E;">Señor Administrador</h1>\
                    <p style="text-align: center;">Se le informa que el <strong>'+profile+'</strong> <strong>'+names+' '+last+'</strong> actualizo su información personal</p>\
                    <p style="text-align: center;"><img src="cid:footer"></p>\
                    <p stlye="text-align: center; color: #E3E3E3;">Este correo se genera automaticamente, porfavor no responder.</p>'
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error){
                console.log(error);
            } else {
                console.log("Email sent");
            }
        });
        //Fin envio correo
        
        data = {
            "code": "0",
            "message": "Usuario actualizado correctamente",
            "update": true
        };
    }else{
        data = {
            "code": "1",
            "update": false,
            "error": "Error al actualizar usuario"
        };
    }
    res.status(200).json(data);
});

//API para capturar id de usuario, consultar direcciones que tiene asociadas y enviarlas al front para gestion de direcciones
router.post('/api/get_address_user', async (req, res) => {
    const { user_id } = req.body;
    const user_address = await pool.query('SELECT us_add.address_title as address_title, us_add.user_address as user_address, \
                                        us_add.description_user_address as description_user_address, \
                                        us_add.id_user_address, barrio.cbar_cdigo as codigo_barrio, barrio.cbar_nmbre_cmuna as comuna, \
                                        barrio.cbar_nmbre_brrio as nombre_barrio, us_add.status, us_add.id_user, mun.nombre_muni FROM users AS us \
                                        INNER JOIN user_address AS us_add ON us.id_user = us_add.id_user \
                                        INNER JOIN comuna_barrio AS barrio ON barrio.cbar_cdigo = us_add.cbar_cdigo \
                                        INNER JOIN municipios AS mun ON mun.id_muni = us_add.id_muni WHERE us.id_user = ?', [user_id]);
    data = {
        "code": "0",
        "data": user_address
    };
    res.status(200).json(data);
});

//Api para obtener los municipios de la base de datos
router.post('/api/get_states', async (req, res) => {
    const states = await pool.query("SELECT muni.id_muni, CONCAT(muni.nombre_muni,' - ',UPPER(depto.name_depto)) as nombre_muni \
    FROM municipios AS muni JOIN departamentos AS depto ON depto.id_depto = muni.id_depto ORDER BY depto.name_depto asc");
    if(states.length > 0){
        data = {
            "code": "0",
            "data": states
        };
    }else{
        data = {
            "code": "1",
            "error": "No existen municipios"
        };
    }
    res.status(200).json(data);
});

//Agregar nueva direccion de un usuario desde movil
router.post('/api/add_user_address', async (req, res) => {
    const { address_title, user_address, description_user_address, id_user, cbar_cdigo } = req.body;
    var id_muni = req.body.id_muni.id_muni;
    const newUserAddress = {
        id_user,
        address_title,
        description_user_address,
        user_address,
        id_muni,
        cbar_cdigo
    };
    const add_address = await pool.query('INSERT INTO user_address SET ?', [newUserAddress]);
    if(add_address){
        data = {
            "code": "0",
            "message": "Dirección guardada correctamente",
            "save": true
        };
    }else{
        data = {
            "code": "1",
            "update": false,
            "error": "Error al guardar la dirección"
        };
    }
    res.status(200).json(data);
});

//Eliminar direccion de un usuario
router.post('/api/delete_address_user', async (req, res) => {
    const { id_user_address } = req.body;
    const delete_address = await pool.query('DELETE FROM user_address WHERE id_user_address = ?', [id_user_address]);
    if(delete_address){
        data = {
            "code": "0",
            "message": "Dirección eliminada correctamente",
            "delete": true
        };
    }else{
        data = {
            "code": "1",
            "update": false,
            "error": "Error al eliminar la dirección"
        };
    }
    res.status(200).json(data);
});

//Capturar id de la direccion de un usuario para poderla editar desde la móvil
router.post('/api/get_address_data_edit', async (req, res) => {
    const { id_user_address } = req.body;
    const rows = await pool.query(' SELECT us_add.address_title as address_title, us_add.user_address as user_address, \
                                    us_add.description_user_address as description_user_address, us_add.id_user_address, \
                                    mun.id_muni, mun.nombre_muni, barrio.cbar_cdigo as codigo_barrio, barrio.cbar_nmbre_cmuna as comuna, \
                                    barrio.cbar_nmbre_brrio as nombre_barrio \
                                    FROM user_address AS us_add \
                                    INNER JOIN municipios AS mun ON mun.id_muni = us_add.id_muni \
                                    INNER JOIN comuna_barrio AS barrio ON barrio.cbar_cdigo = us_add.cbar_cdigo \
                                    WHERE us_add.id_user_address = ?', [id_user_address]);
    if(rows.length > 0){
        const address = rows[0];
        data = {
            "code": "0",
            "data": address
        };
    }else{
        data = {
            "code": "1",
            "error": "La dirección no existe"
        };
    }
    res.status(200).json(data);
});

//Actualizar una direccion de un usuario desde movil
router.post('/api/update_user_address', async (req, res) => {
    const { address_title, user_address, description_user_address, id_user, cbar_cdigo } = req.body;
    var id_muni = req.body.id_muni.id_muni;
    var id_user_address = req.body.id_user_address;

    const update_address = await pool.query('UPDATE user_address \
                                            SET address_title = ?, description_user_address = ?, \
                                            user_address = ?, id_muni = ?, cbar_cdigo = ? WHERE id_user_address = ?', [address_title, description_user_address, user_address, id_muni, cbar_cdigo, id_user_address]);
    if(update_address){
        data = {
            "code": "0",
            "message": "Dirección actualizada correctamente",
            "save": true
        };
    }else{
        data = {
            "code": "1",
            "update": false,
            "error": "Error al editar la dirección"
        };
    }
    res.status(200).json(data);
});

//Api para la movil para cambiar la direccion activa de un usuario
router.post('/api/change_status_address_user', async (req, res) => {
    const { user_address_id, id_user } = req.body;
    const inactive = 0;
    const active = 1;
    const update_status_address_cero = await pool.query('UPDATE user_address set status = ? WHERE id_user = ?', [inactive, id_user]);
    const update_status_address = await pool.query('UPDATE user_address set status = ? WHERE id_user_address = ?', [active, user_address_id]);
    if(update_status_address_cero && update_status_address){
        data = {
            "code": "0",
            "message": "Dirección marcado como principal",
            "delete": true
        };
    }else{
        data = {
            "code": "1",
            "update": false,
            "error": "Error al actualizar la dirección"
        };
    }
    res.status(200).json(data);
});

//Api para la movil para cambiar la direccion activa de un usuario
router.post('/api/save_position_user', async (req, res) => {
    const { latitude, longitude, user } = req.body;
    let updated_position = new Date();
    const update_lat_lon = await pool.query('UPDATE users set latitude = ?, longitude = ?, updated_position = ? WHERE id_user = ?', [latitude, longitude, updated_position, user]);
    data = {
        "code": "0",
        "message": "Se actualiza posicion",
    };
    res.status(200).json(data);
});

//Api para guardar un mensaje de paseador-cliente o cliente-paseador
router.post('/api/save_message', async (req, res) => {
    const { content_message, url_photo, id_user_envia, id_user_recibe } = req.body;
    let created_at = new Date();
    let username = await pool.query('SELECT username FROM users WHERE id_user = ?',[id_user_envia]);
    let user_create = username[0].username;
    const newMessage = {
        content_message,
        url_photo,
        id_user_envia,
        id_user_recibe,
        created_at,
        user_create
    };
    const add_message = await pool.query('INSERT INTO message SET ?', [newMessage]);
    if(add_message){
        data = {
            "code": "0",
            "message": "Mensaje almacenado con éxito",
            "save": true
        };
    }else{
        data = {
            "code": "1",
            "update": false,
            "error": "Error al guardar el mensaje"
        };
    }
    res.status(200).json(data);
});

//Api para listar los mensajes que recibe un usuario
router.post('/api/get_message_receive_user', async (req, res) => {
    const { id_user } = req.body;
    let messages_user = await pool.query('  SELECT mes.id_message, mes.content_message, mes.url_photo, DATE_FORMAT(mes.created_at, "%Y-%m-%d") fecha, \
                                            DATE_FORMAT(mes.created_at,"%H:%i:%s") hora, us.id_user as id_user_envia, us.names as name_user_envia, us.lastnames as lastnames_user_envia,\
                                            us2.id_user as id_user_recibe, us2.names as name_user_recibe, us2.lastnames as lastnames_user_recibe\
                                            FROM message as mes\
                                            JOIN users as us ON us.id_user = mes.id_user_envia\
                                            JOIN users as us2 ON us2.id_user = mes.id_user_recibe\
                                            WHERE mes.id_user_recibe = ?',[id_user]);
    if(messages_user){
        data = {
            "code": "0",
            "message": "Mensajes recibidos listados correctamente",
            "data": messages_user
        };
    }else{
        data = {
            "code": "1",
            "error": "Error al listar los mensajes"
        };
    }
    res.status(200).json(data);
});

//Api para listar los mensajes que envia un usuario
router.post('/api/get_message_send_user', async (req, res) => {
    const { id_user } = req.body;
    let messages_user = await pool.query('SELECT mes.id_message, mes.content_message, mes.url_photo, DATE_FORMAT(mes.created_at, "%Y-%m-%d") fecha, \
                        DATE_FORMAT(mes.created_at,"%H:%i:%s") hora, us.id_user as id_user_envia, us.names as name_user_envia, us.lastnames as lastnames_user_envia,\
                        us2.id_user as id_user_recibe, us2.names as name_user_recibe, us2.lastnames as lastnames_user_recibe\
                        FROM message as mes\
                        JOIN users as us ON us.id_user = mes.id_user_envia\
                        JOIN users as us2 ON us2.id_user = mes.id_user_recibe\
                        WHERE mes.id_user_envia = ?',[id_user]);
    if(messages_user){
        data = {
            "code": "0",
            "message": "Mensajes recibidos listados correctamente",
            "data": messages_user
        };
    }else{
        data = {
            "code": "1",
            "error": "Error al listar los mensajes"
        };
    }
    res.status(200).json(data);
});

//Api para inactivar un usuario
router.post('/inactive_user', async (req, res) => {
    const { id_user } = req.body;

    let deleted_at = new Date();
    let status_user = 2;
    const query_inactive = await pool.query('UPDATE users set status_user = ?, deleted_at = ? WHERE id_user = ?',[status_user, deleted_at, id_user]);
    if(query_inactive){
        data = {
            "code": "0",
            "message": "Usuario inactivo correctamente",
            "update": true
        };
    }else{
        data = {
            "code": "1",
            "error": "Error al deshabilitar el usuario"
        }
    }

});

//Api para inactivar un usuario
router.post('/active_user', async (req, res) => {
    const { id_user } = req.body;

    let updated_at = new Date();
    let status_user = 1;
    const query_active = await pool.query('UPDATE users set status_user = ?, updated_at = ?, deleted_at = null WHERE id_user = ?',[status_user, updated_at, id_user]);
    if(query_active){
        data = {
            "code": "0",
            "message": "Usuario activo correctamente",
            "update": true
        };
    }else{
        data = {
            "code": "1",
            "error": "Error al activar el usuario"
        }
    }

});

//Api para obtener todos los barrios con sus comunas
router.post('/api/get_all_district', async (req, res) => {
    const all_district = await pool.query('SELECT * FROM comuna_barrio');
    if(all_district.length > 0){
        data = {
            "code": "0",
            "message": "Barrios listados correctamente",
            "status": true,
            "data": all_district
        };
    }else{
        data = {
            "code": "1",
            "error": "Error al listar los barrios",
            "status": false
        }
    }
    res.status(200).json(data);
});

//Api para registrar un paseador
router.post('/api/register_walker', async (req, res) => {
    const { names, lastnames, document, email, phone, username, password, term_condition, cbar_cdigo_walker, address_walker, walker_time_availability } = req.body;
    let created_at = new Date();
    const username_result = await pool.query('SELECT username FROM users WHERE username = ?', [username]);
    const document_result = await pool.query('SELECT document FROM users WHERE document = ?', [document]);
    const email_result = await pool.query('SELECT email FROM users WHERE email = ?', [email]);
    if(username_result.length > 0){
        data = {
            "code": "1",
            "save": false,
            "error": "Este nombre de usuario ya se encuentra registrado."
        };
    }else if(document_result.length > 0){
        data = {
            "code": "1",
            "save": false,
            "error": "Este documento ya se encuentra registrado."
        };
    }else if(email_result.length > 0){
        data = {
            "code": "1",
            "save": false,
            "error": "Este email ya se encuentra registrado."
        };
    }else if(req.body.password != req.body.confirm_password){
        data = {
            "code": "1",
            "save": false,
            "error": "Las contraseñas no coinciden."
        };
    }else{
        const newWalker = {
            names,
            lastnames,
            document,
            email,
            phone,
            username,
            term_condition,
            cbar_cdigo_walker,
            address_walker,
            walker_time_availability,
            created_at
        };
        newWalker.password = await helpers.encryptPassword(password);
        const add_walker = await pool.query('INSERT INTO users SET ?', [newWalker]);
        const id_user = add_walker.insertId;
        let id_profile = 2;
        let status_user_profile = 1;

        const newPorfileUser = {
            id_user,
            id_profile,
            status_user_profile
        };
        const query_user_profile = await pool.query('INSERT INTO user_profile SET ?', [newPorfileUser]);

        if(add_walker){
            // Inicio envio correo
            const transporter = nodemailer.createTransport({
                host: data_email.host,
                port: data_email.port,
                auth: {
                    user: data_email.auth.user,
                    pass: data_email.auth.pass,
                }
                });
            // Definimos el email
            var mailOptions = {
                from: 'no-responder',
                to: email,
                subject: 'Bienvenido',
                attachments: [{
                    filename: 'icon.png',
                    path: 'src/public/img/correos/icon.png',
                    cid: 'icon'
                    },
                    {
                    filename: 'footer.jpg',
                    path: 'src/public/img/correos/footer.jpg',
                    cid: 'footer'
                }],
                html: ' <p style="text-align: center;"><img src="cid:icon"></p>\
                        <h1 style="text-align: center; color: #DA7F2E;">Señor paseador '+names+' Bienvenido a paseando tu mascota</h1>\
                        <p style="text-align: center;">Estos son tun datos de acceso a nuestra plataforma:</p>\
                        <p style="text-align: center;"><strong>Usuario: </strong>'+username+' <strong>Contraseña: </strong>'+password+'</p>\
                        <p style="text-align: center;"><img src="cid:footer"></p>\
                        <p stlye="text-align: center; color: #E3E3E3;">Este correo se genera automaticamente, porfavor no responder.</p>'
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error){
                    console.log(error);
                } else {
                    console.log("Email sent");
                }
            });
            //Fin envio correo
            data = {
                "code": "0",
                "message": "Registro exitoso",
                "save": true
            };
        }else{
            data = {
                "code": "1",
                "error": "Error al realizar el registro. Verifique",
                "save": false
            };
        }
    }
    res.status(200).json(data);
});

//Servicio para listar tips por roles
router.post('/api/get_tips_by_user', async (req, res) => {
    const { id_user } = req.body;
    const user_result = await pool.query('  SELECT * FROM users as us \
                                            JOIN user_profile AS us_pro ON us_pro.id_user = us.id_user \
                                            WHERE us.id_user = ?', [id_user]);
    let profile = user_result[0].id_profile;
    //1: superadmin, 2: paseador, 3: cliente
    if(profile == 2){
        data = {
            "code": "0",
            "profile": "paseador",
            "tips":[
                p0= "Cuida bien a las mascotas.",
                p1= "Se responsable del adecuado manejo de residuos y demás herramientas inherentes al paseo.",
                p2= "Recuerda que por obligacion debes hacer checkin y checkout por cada paseo.",
                p3= "Paseando tu mascota solo te pagara los paseos que queden registrados con checkin y checkout",
                p4= "Recuerda activar la jornada cada que inicies un dia y desactivarla al finalizar.",
                p5= "Recuerda hidratar constantemente a tus mascotas"
            ]
        };
    }else if(profile == 3){
        data = {
            "code": "0",
            "profile": "cliente",
            "tips":[
                p0="Para poder utilizar la app debes crear primero una dirección en el Menú/Mis Direcciones",
                p1="Los paseos tiene una duración estimada de 2 horas. Los horarios que tenemos establecidos son de 7 a 9, de 9 a 11 y de 11 a 1 de la tarde. Si el cliente requiere de otro horario puede programarse sin ningún problema.",
                p2="El tiempo estimado para recoger a la moscota es de 30 minutos",
                p3="Paseando tu mascota se hace responsable del adecuado manejo de residuos y demás herramientas inherentes al paseo.",
                p4="El cliente podrá contar con la opción de la vigilancia del recorrido mediante el GPS",
                p5="Recuerda que en paseando tu mascota nos preocupamos por tu peludo, asi que lo estamos hidratando constantemente durante el paseo",
                p6="Todos los paseos incluyen un seguro basico con nuestro aliado SURA",
                p7="Solo se admite el registro de mascotas mayores a 3 meses y menores a 10 años de edad"
            ]
        };
    }else{
        data = {
            "code": "0",
            "profile": "administrador",
            "tips":[
                p0= "Përfil administrador"
            ]
        };
    }
    res.status(200).json(data);
});

//Servicio para listar tips por roles
router.post('/api/get_schedules', async (req, res) => {
    let shedule =  await pool.query('SELECT * FROM hora_sugerida_paseo');
    data = {
        "code": "0",
        "get": "true",
        "data": shedule
    };
    res.status(200).json(data);
});

//Api para saber si un usuario tiene por lo menos una direccion creada
router.post('/api/user_address_active', async (req, res) => {
    const { id_user } = req.body;
    if(id_user == '' || id_user == undefined || id_user == null){
        data = {
            "code": "2",
            "message": "El usuario no existe",
            "data": false
        };
    }else{
        const user_address = await pool.query('SELECT us_add.address_title as address_title, us_add.user_address as user_address, \
                                        us_add.description_user_address as description_user_address, \
                                        us_add.id_user_address, barrio.cbar_cdigo as codigo_barrio, barrio.cbar_nmbre_cmuna as comuna, \
                                        barrio.cbar_nmbre_brrio as nombre_barrio, us_add.status, us_add.id_user, mun.nombre_muni FROM users AS us \
                                        INNER JOIN user_address AS us_add ON us.id_user = us_add.id_user \
                                        left JOIN comuna_barrio AS barrio ON barrio.cbar_cdigo = us_add.cbar_cdigo \
                                        left JOIN municipios AS mun ON mun.id_muni = us_add.id_muni WHERE us.id_user = ?', [id_user]);
        if(user_address.length > 0){
            data = {
                "code": "0",
                "message": "El usuario existe y tiene direccion principal creada",
                "data": true
            };
        }else{
            data = {
                "code": "1",
                "message": "Debe crear una dirección para poder continuar",
                "data": false
            };
        }
    }


    res.status(200).json(data);
    
});

//Api para almacenar el token de un usuario
router.post('/api/save_token', async (req, res) => {
    let { id_user, token } = req.body;
    let save_token_user =  await pool.query('UPDATE users SET token = ? WHERE id_user = ?',[token, id_user]);
    if(save_token_user){
        data = {
            "code": "0",
            "message": "Token almacenado con exito",
            "save": true
        };
    }else{
        data = {
            "code": "1",
            "message": "Error al almacenar el token",
            "save": false
        };
    }

    res.status(200).json(data);
});

//Api para obtener el token de un usuario con su id
router.post('/api/get_token_user', async (req, res) => {
    let { id_user } = req.body;
    let get_token_user =  await pool.query('SELECT token FROM users WHERE id_user = ?',[id_user]);
    if(get_token_user.length > 0){
        data = {
            "code": "0",
            "message": "Se obtiene el token del usuario",
            "data": get_token_user[0]
        };
    }else{
        data = {
            "code": "1",
            "message": "Error al obtener el token del usuario",
            "get": false
        };
    }

    res.status(200).json(data);
});

//Servicio para probar envio de correos
router.post('/api/send_mail', async (req, res) => {
        // Definimos el transporter
        const transporter = nodemailer.createTransport({
            host: data_email.host,
            port: data_email.port,
            auth: {
              user: data_email.auth.user,
              pass: data_email.auth.pass,
            }
          });
        // Definimos el email
        var mailOptions = {
            from: 'no-responder',
            to: 'danigb66@gmail.com',
            subject: 'Bienvenido',
            attachments: [{
                filename: 'icon.png',
                path: 'src/public/img/correos/icon.png',
                cid: 'icon'
                },
                {
                filename: 'footer.jpg',
                path: 'src/public/img/correos/footer.jpg',
                cid: 'footer'
            }],
            html: ' <p style="text-align: center;"><img src="cid:icon"></p>\
                    <h1 style="text-align: center; color: #DA7F2E;">Bienvendo a paseando tu mascota</h1>\
                    <p style="text-align: center;">Para nosotros es un placer contar con tu registro y que utilices nuestros servicios</p>\
                    <p style="text-align: center;"><img src="cid:footer"></p>\
                    <p stlye="text-align: center; color: #E3E3E3;">Este correo se genera automaticamente, porfavor no responder.</p>'
        };
        // Enviamos el email
        transporter.sendMail(mailOptions, function(error, info){
            if (error){
                console.log(error);
            } else {
                console.log("Email sent");
                //res.status(200).jsonp(req.body);
            }
        });

});

module.exports = router;