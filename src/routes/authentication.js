const express = require('express');
const router = express.Router();
const passport = require('passport');
const nodemailer = require('nodemailer');
const pool = require('../database');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/signin', isNotLoggedIn,(req, res) => {
    res.render('auth/signin');
});

router.post("/signin", passport.authenticate('local-signin',{
    successRedirect: '/verificar',
    failureRedirect: '/signin',
    failureFlash:true
}));

router.post("/recover", async (req, res) => {
    const { email } = req.body;
    const rows = await pool.query('SELECT * FROM usuarios WHERE correo = ?',[email]);
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail', // true for 465, false for other ports
    auth: {
      user: "pruebasyseguridadmanuel@gmail.com", // generated ethereal user
      pass: "Leones11", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"🛴sCUTer"', // sender address
    to: `${email}` , // list of receivers
    subject: "Recuperacion de contraseña", // Subject line
    text: "Tu contraseña es: "+rows[0].contrasena
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  req.flash('success', "Contraseña Enviada")
    res.redirect('/signin');
});

router.get('/verificar', isLoggedIn, (req, res)=>{
    
    if(req.user.id == 0){
        return res.redirect('/admin');
    }else{
        if(!req.user.habilitado){
            res.redirect('/logout');
        }
        else{
            return res.redirect('/scuter');       
        }

        
    }
});

router.get('/logout', (req, res) => {
    if(!req.user.habilitado){
        req.flash('message', "La cuenta fue temporalmente deshabilitada, para más información contacte al administrador.");
    }
    req.logOut();
    return res.redirect('/');
});

module.exports = router;