module.exports = password => {
  if (password.length < 4) return false
  else return true
}
