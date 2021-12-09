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


router.get('/departamento',isLoggedIn, isAdmin, async(req, res) =>{
    const departamentos = await pool.query('SELECT * FROM departamentos');
    res.render('admin/departamentos', {departamentos});
});

router.post('/departamento/actualizar/:id',isLoggedIn, isAdmin, async(req, res) =>{
    const { id } = req.params;
    const { departamento } = req.body;
    const user = await pool.query('SELECT * FROM departamentos WHERE iddepartamento = ?', [id]);
    if(user.length > 0){
        await pool.query('UPDATE departamentos SET nombre = ? WHERE iddepartamento = ?',[departamento,  id]);
        req.flash('success', "Datos actualizados correctamente");
        res.redirect('/admin/departamento');
    }else{
        req.flash('message', "El departamento no existe");
        res.redirect('/admin/departamento');
    }
});

router.post('/departamento/eliminar/:id',isLoggedIn, isAdmin, async(req, res) =>{
    const { id } = req.params;
    const user = await pool.query('SELECT * FROM departamentos WHERE iddepartamento = ?', [id]);
    if(user.length > 0){
        await pool.query('DELETE FROM `departamentos` WHERE iddepartamento = ?',[  id]);
        req.flash('success', "Datos actualizados correctamente");
        res.redirect('/admin/departamento');
    }else{
        req.flash('message', "El departamento no existe");
        res.redirect('/admin/departamento');
    }
});

router.post("/departamento/nuevo",isLoggedIn, isAdmin, async (req, res) =>{
    const { nombre } = req.body;
    const rows = await pool.query('SELECT * FROM departamentos WHERE nombre = ?',[nombre]);
    if(rows.length > 0){
        req.flash('message', "El departamento ya existe");
    }else{
        const query1 = await pool.query('INSERT INTO departamentos(iddepartamento,nombre) VALUES(null,?)', [nombre]);
        req.flash('success', "Departamento creado correctamente");
    }
    res.redirect('/admin/departamento');
});

router.get('/producto',isLoggedIn, isAdmin, async(req, res) =>{
    const productos = await pool.query('SELECT * FROM productos p INNER JOIN departamentos d ON d.iddepartamento = p.iddepartamento ORDER BY p.iddepartamento');
    res.render('admin/productos', {productos});
});

router.post('/producto/actualizar/:id',isLoggedIn, isAdmin, async(req, res) =>{
    const { id } = req.params;
    const { nombre, cantidad, precioC, precioV } = req.body;
    const user = await pool.query('SELECT * FROM productos WHERE idproductos = ?', [id]);
    if(user.length > 0){
        await pool.query('UPDATE productos SET nombre_producto=?, cantidad=?, precio_compra=?, precio_venta=? WHERE idproductos = ?',[nombre, cantidad, precioC, precioV, id]);
        req.flash('success', "Datos actualizados correctamente");
    }else{
        req.flash('message', "El producto no existe");
    }
    res.redirect('/admin/producto');
});

router.post('/producto/eliminar/:id',isLoggedIn, isAdmin, async(req, res) =>{
    const { id } = req.params;
    const user = await pool.query('SELECT * FROM productos WHERE idproductos = ?', [id]);
    if(user.length > 0){
        await pool.query('DELETE FROM productos WHERE idproductos = ?',[  id]);
        req.flash('success', "Datos actualizados correctamente");
    }else{
        req.flash('message', "El producto no existe");
    }
    res.redirect('/admin/producto');
});

router.get('/producto/registro',isLoggedIn, isAdmin, async(req, res) =>{
    const departamentos = await pool.query('SELECT * FROM departamentos');
    res.render('admin/registroProducto', {departamentos});
});

router.post("/producto/registro",isLoggedIn, isAdmin, async (req, res) =>{
    const { nombre, cantidad, precioC,  precioV, departamento } = req.body;
    await pool.query('INSERT INTO `productos`(`idproductos`, `nombre_producto`, `descripcion`, `cantidad`, `precio_compra`, `precio_venta`, `iddepartamento`) VALUES (null,?,"",?,?,?,?)', [nombre, cantidad, precioC,  precioV, departamento ]);
    req.flash('success', "producto registrado correctamente");
    res.redirect('/admin/producto/registro');
});

router.get('/ventas',isLoggedIn, isAdmin, async(req, res) =>{
    const ventas = await pool.query('SELECT * FROM ventas');
    res.render('admin/ventas', {ventas});
});

router.get('/ventas/:id', isLoggedIn, isAdmin, async(req, res) =>{
    const { id } = req.params;
    const detalles = await pool.query('SELECT d.subtotal AS subtotal, p.nombre_producto AS nombre, d.cantidad AS cantidad FROM detalle_ventas d INNER JOIN productos p ON p.idproductos = d.idproductos WHERE idventas = ?',[id]);
    if(detalles.length > 0){
        const total = await pool.query('SELECT SUM(subtotal) AS total  FROM detalle_ventas WHERE idventas = ?',[id]);
        res.render('admin/imprimir', {detalles: detalles, id: id, total: total[0].total});
    }else{
        req.flash('message', "La venta no existe");
        res.redirect('/ventas');
    }
});

module.exports = router;