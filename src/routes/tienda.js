const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/', isLoggedIn, async (req, res) => {
    const codigo= req.query.codigo;
    const venta = await pool.query('SELECT * FROM ventas WHERE idusuarios = ? AND vendido = false',[req.user.id]);
    if(codigo != null){
        const producto = await pool.query('SELECT * FROM productos WHERE idproductos = ?',[codigo]);
        if(producto.length > 0){
            if(venta.length > 0){
                const detalles = await pool.query('SELECT d.subtotal AS subtotal, p.nombre_producto AS nombre, d.cantidad AS cantidad FROM detalle_ventas d INNER JOIN productos p ON p.idproductos = d.idproductos WHERE idventas = ?',[venta[0].idventas]);
                const total = await pool.query('SELECT SUM(subtotal) AS total FROM detalle_ventas WHERE idventas = ?',[venta[0].idventas]);
                res.render("tienda/agregar", {producto: producto[0], mostrar: true, carrito: true, detalles: detalles, contador: detalles.length, total: total[0].total})
            }else{
                res.render("tienda/agregar", {producto: producto[0], mostrar: true, carrito: false, contador: 0, total: 0})
            }
        }else{
            req.flash('message', "El producto no existe");
            res.redirect('/tienda');
        } 
    }else{
        if(venta.length > 0){
            const detalles = await pool.query('SELECT d.subtotal AS subtotal, p.nombre_producto AS nombre, d.cantidad AS cantidad FROM detalle_ventas d INNER JOIN productos p ON p.idproductos = d.idproductos WHERE idventas = ?',[venta[0].idventas]);
            const total = await pool.query('SELECT SUM(subtotal) AS total  FROM detalle_ventas WHERE idventas = ?',[venta[0].idventas]);
            res.render("tienda/agregar", { mostrar: false, carrito: true, detalles: detalles, contador: detalles.length, total: total[0].total})
        }else{
            res.render("tienda/agregar", { mostrar: false, carrito: false, contador: 0, total: 0})
        }
    }
});

router.post("/agregar",isLoggedIn,  async (req, res) =>{
    const { idproductos,precioV, cantidad } = req.body;
        const venta = await pool.query('SELECT * FROM ventas WHERE idusuarios = ? AND vendido = false',[req.user.id]);
        if(venta.length > 0){
            await pool.query('INSERT INTO `detalle_ventas`(`iddetalle_ventas`, `cantidad`, `subtotal`, `idventas`, `idproductos`) VALUES (null,?,?,?,?)', [cantidad, (parseFloat(cantidad)*parseFloat(precioV)), venta[0].idventas, idproductos ]);    
        }else{
            await pool.query('INSERT INTO `ventas`(`idventas`, `idusuarios`, `vendido`, `fecha_venta`, `total`) VALUES (null,?,false,?,0)', [req.user.id, new Date()]);
            const ticket = await pool.query('SELECT * FROM ventas WHERE idusuarios = ? AND vendido = false',[req.user.id]);
            await pool.query('INSERT INTO `detalle_ventas`(`iddetalle_ventas`, `cantidad`, `subtotal`, `idventas`, `idproductos`) VALUES (null,?,?,?,?)', [cantidad, (parseFloat(cantidad)*parseFloat(precioV)), ticket[0].idventas, idproductos ]);
        }
        res.redirect('/tienda');
});

router.post("/pagar",isLoggedIn,  async (req, res) =>{
    const venta = await pool.query('SELECT * FROM ventas WHERE idusuarios = ? AND vendido = false',[req.user.id]);
    if(venta.length > 0){
        const total = await pool.query('SELECT SUM(subtotal) AS total  FROM detalle_ventas WHERE idventas = ?',[venta[0].idventas]);
        await pool.query('UPDATE `ventas` SET `vendido`= true,`total`= ? WHERE idusuarios = ? AND `vendido`= false', [total[0].total,req.user.id]);
        const detalles = await pool.query('SELECT * FROM detalle_ventas WHERE idventas = ?',[venta[0].idventas]);
        detalles.forEach(async(element) => {
            await pool.query('UPDATE `productos` SET `cantidad`= `cantidad` - ? WHERE idproductos = ? ', [element.cantidad, element.idproductos]);
        });
        req.flash('success', "Pago realizado");
    }else{
        req.flash('message', "No esta realizando alguna venta");
    }
    res.redirect('/tienda');
});

module.exports = router;