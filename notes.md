Link deploy: https://hackverflow.firebaseapp.com/

Fitur yang kurang: 

* Background process belum sama sekali
* profpic user belum bisa di update, dapet default avatar kosong, tapi kalo sign in with google langsung pake profile picture google
* password default kalo register pake google tapi mau signin biasa: q1w2e3r4 (belom ada fitur ganti password)
* kalo register/sign in with google, harus manual refresh habis itu baru kedetect udah login


env:

JWT_SECRET = inisecretyak
GOOGLE_CLIENTID = 110130124920-95uupn9s7c876d2ii90kljstp4fu8iov.apps.googleusercontent.com
MONGODB_URL = mongodb://hackverflow:q1w2e3r4@ds111244.mlab.com:11244/hackverflow


tapi lupa ini clientID buat local apa buat deploy kalo ngga bisa nanti gua bikin clientID baru lagi
