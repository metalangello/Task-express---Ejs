module.exports = {
    isLoggedin(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }else{
            return res.redirect('/task');
        }
    },

    isNotLoggedin(req, res, next){
        if(!req.isAuthenticated()){
            return next();
        }
        else{
            return res.redirect('/home');
        }
    }
}