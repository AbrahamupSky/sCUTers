const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const hbs = require('handlebars');


//Llamad a DB
const { database } = require('./keys');

//Inicializaciones
const app = express();
require('./lib/passport');

//Configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

hbs.registerHelper('if_eq', function(a, b, opts) {
    if(a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
});

//Midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(session({
    secret: 'mysesion',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());



//Variables Globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

//Rutas
app.use(require('./routes/index'));
app.use('/admin', require('./routes/admin'));
app.use(require('./routes/authentication'));
app.use('/tienda', require('./routes/tienda'));

//Archivos Publicos
app.use(express.static(path.join(__dirname, 'public')))

//Iniciar Servidor
app.listen(app.get('port'), () => {
    console.log('Servidor corriendo en puerto: ', app.get('port'));
});