Link deploy: https://hackverflow.firebaseapp.com/

* kalo mau ngetes di local, ganti client ID di head index.html public, sama di .env. 
* terus ganti baseURL di Vue.prototype.$axios jadi http://localhost:3000, dan ganti alamat axios.post di onSigninGoogle (di ToolbarTop.vue) jadi http://localhost:3000/users/oauth

Fitur yang kurang: 

* Background process belum sama sekali
* profpic user belum bisa di update, dapet default avatar discord kosong, tapi kalo sign in with google langsung pake profile picture google
* password default kalo register pake google tapi mau signin biasa: q1w2e3r4 (belom ada fitur ganti password)



env:

JWT_SECRET = inisecretyak
GOOGLE_CLIENTID = 110130124920-g6a4j4262updmaagans8lrr21mo4p0kc.apps.googleusercontent.com =====>>> INI LOCAL
GOOGLE_CLIENTID = 110130124920-frssao5pjngf1ghg5vrko2ek9fc4phmb.apps.googleusercontent.com =====>>> INI DEPLOY
MONGODB_URL = mongodb://hackverflow:q1w2e3r4@ds111244.mlab.com:11244/hackverflow


Fixed feature: 

*Google login up and running
