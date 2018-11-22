
function isLogin(req,res,next){
    if(req.headers.token){
        next()
    } else {
        res.status(403).json({
            message: 'Forbidden'
        })
    }
}

module.exports = isLogin