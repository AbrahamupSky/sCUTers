const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const helper = require('../lib/helper');
const pool = require('../database');


passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done)=>{
    if(email == "admin@localhost"){
        var passwordCompare = "$2a$10$rE7Mjxb5Apw1d5yrccwU7Oo9wWBoigGxIpaFJ3MYPFos1Ke29.FdK";
        const validPassword = await helper.matchPassword(password, passwordCompare)
        if(validPassword){
            let user ={
                id: 0,
                nombre: "Administrador",
            }
            done(null, user, req.flash('success', 'Bienvenido ' + user.nombre));
        }
        else{
            done(null, false, req.flash('message', 'Contraseña administrador incorrecta'));
        }
    }else{
        const rows = await pool.query('SELECT * FROM usuarios WHERE correo = ?',[email]);
        if (rows.length > 0) {
            const user = rows[0];
            if (user.contrasena == password) {
              done(null, user, req.flash('success', 'Bienvenido ' + user.nombre));
            } else {
              done(null, false, req.flash('message', 'Contraseña Incorrecta'));
            }
          } else {
            return done(null, false, req.flash('message', 'El usuario no existe'));
          }
    }


}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    if(id == 0){
        let user ={
            id: 0,
            nombre: "ADMINISTRADOR",
            apellido_paterno: null,
            apellido_materno: null,
            cargo: "admin",
            habilitado: true,
            correo: "admin@localhost",
            contraseña: "$2a$10$rE7Mjxb5Apw1d5yrccwU7Oo9wWBoigGxIpaFJ3MYPFos1Ke29.FdK"
        }
        done(null,user);
    }else{
        const rows = await pool.query('SELECT * FROM usuarios WHERE id = ?',[id]);
        done(null, rows[0]);
    }

});