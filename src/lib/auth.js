module.exports = {
    isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {

            return next();
            
        }
        return res.redirect('/');
    },

    isAdmin (req, res, next){
        if(req.user.id == 0){
            return next();
        }else{
            return res.redirect('/verificar');
        }
    },
    isNotLoggedIn (req, res, next){
        if(!req.isAuthenticated()){
            return next()
        }
        return res.redirect('/verificar');
    }

};