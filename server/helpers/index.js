const crypto = require('crypto')

class Helper {
    static auth(password) {
        return crypto.createHmac('sha256',process.env.SALT).update(password).digest('hex')
    }

    static generateToken(email) {
        return jwt.sign( email, process.env.SALT)
    }
}

module.exports = Helper

