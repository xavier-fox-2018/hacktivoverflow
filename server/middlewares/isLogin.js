const jwtHelper = require('../helpers/jwtHelper')

function isLogin(req,res,next){
    if(req.headers.token){
        let user = jwtHelper.decode(req.headers.token)
        req.decoded = user
        next()
    } else {
        res.status(403).json({
            message: 'Forbidden'
        })
    }
}

module.exports = isLogin