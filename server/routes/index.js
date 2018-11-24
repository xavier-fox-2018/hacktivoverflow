const router = require('express').Router()

router.get('/',(req,res)=>{
    res.send('HALO DARI PET OVERFLOW')
})

module.exports = router