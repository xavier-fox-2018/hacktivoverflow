const crypto = require('crypto')

module.exports = (password, salt) => {
  return crypto.createHmac('sha256', salt)
               .update(password)
               .digest('hex')
}
