//librerias
const passport = require('passport');
const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn, isAdmin } = require('../lib/auth');


router.get('/',isLoggedIn, isAdmin, async(req, res) =>{
    const usuarios = await pool.query('SELECT * FROM usuarios');
    const total = usuarios.length;
    res.render('admin/usuario', {usuarios, total});
});


router.get('/usuario/registro',isLoggedIn, isAdmin, async(req, res) =>{
    res.render('admin/registroUsuario');
});

router.post("/usuario/registro",isLoggedIn, isAdmin, async (req, res) =>{
    const { nombre, apellidoP, apellidoM,  correo, password, password2 } = req.body;
    if(correo != "admin@localhost"){
        if(password == password2){
            const rows = await pool.query('SELECT * FROM usuarios WHERE correo = ?',[correo]);
            if(rows.length > 0){
                req.flash('message', "El usuario ya existe, verifique su correo");
            }else{
                const query1 = await pool.query('INSERT INTO usuarios(id,nombre,apellido_paterno,apellido_materno,cargo,habilitado,correo,contrasena) VALUES(null,?,?,?,"vendedor",false,?,?)', [nombre, apellidoP, apellidoM, correo, password]);
                req.flash('success', "Usuario registrado correctamente");
            }
        }else{ req.flash('message', "Las contraseñas no coinciden, ingrese nuevamente"); }
    }else{ req.flash('message', "No es posible registrar a este usuario");}
    res.redirect('/admin/usuario/registro');
});


router.get('/usuario/:id', isLoggedIn, isAdmin, async(req, res) =>{
    const { id } = req.params;
    const usuario = await pool.query('SELECT * FROM usuarios WHERE id = ?',[id]);
    if(usuario.length > 0){
        res.render('admin/actualizarUsuario', {usuario: usuario[0]});
    }else{
        req.flash('message', "El usuario no existe");
        res.redirect('/admin');
    }
});

router.post('/usuario/actualizar/:id',isLoggedIn, isAdmin, async(req, res) =>{
    const { id } = req.params;
    const { nombre, apellidoP, apellidoM, correo } = req.body;
    const user = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    if(user.length > 0){
        await pool.query('UPDATE usuarios SET nombre = ?,  apellido_paterno = ?, apellido_materno = ?, correo = ? WHERE id = ?',[nombre, apellidoP, apellidoM, correo, id]);
        req.flash('success', "Datos actualizados correctamente");
        res.redirect('/admin/usuario/'+id);
    }else{
        req.flash('message', "El usuario no existe");
        res.redirect('/admin');
    }
});

router.post('/usuario/eliminar/:id',isLoggedIn, isAdmin, async(req, res) =>{
    const { id } = req.params;
    const user = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    if(user.length > 0){
        await pool.query('DELETE FROM usuarios WHERE id = ?',[id]);
        req.flash('success', "Usuario eliminado correctamente");
        res.redirect('/admin');
    }else{
        req.flash('message', "El usuario no existe");
        res.redirect('/admin');
    }
});

router.post('/usuario/password/:id',isLoggedIn, isAdmin, async(req, res) =>{
    const { id } = req.params;
    const { password, password2} = req.body;
    if( password == password2){
        await pool.query('UPDATE usuarios SET contrasena = ? WHERE id = ?',[password, id]);
        req.flash('success', "La contraseña ha sido actualizada");
        res.redirect('/admin/usuario/'+id);
    }else{
        req.flash('message', "Las contraseñas no coinciden");
        res.redirect('/admin/usuario/'+id);
    }
});

router.post('/habilitar',isLoggedIn, isAdmin, async(req, res) =>{
    const { id } = req.body;
    const equipo = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    if(equipo.length > 0){
        await pool.query('UPDATE usuarios SET habilitado = true WHERE id = ?',[ id]);
        req.flash('success', "Usuario Habilitado");
        res.redirect('/admin');
    }else{
        req.flash('message', "El usuario ya no existe");
        res.redirect('/admin');
    }
});
router.post('/deshabilitar',isLoggedIn, isAdmin, async(req, res) =>{
    const { id } = req.body;
    const equipo = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    if(equipo.length > 0){
        await pool.query('UPDATE usuarios SET habilitado = false WHERE id = ?',[ id]);
        req.flash('success', "Usuario Deshabilitado");
        res.redirect('/admin');
    }else{
        req.flash('message', "El usuario ya no existe");
        res.redirect('/admin');
    }
});



module.exports = router;