.env: 
JWT_SECRET=iniharusbagus
CLOUD_BUCKET=hacktivoverflow-storage
GCLOUD_PROJECT=hot-deal-221803
KEYFILE_PATH=keyfile.json
CLIENT_ID=667143622572-sh5bo54trnnkodvbvr1fg69dg9sk7tt4.apps.googleusercontent.com
dbuser=hacktivoverflow
dbpassword=hacktivoverflow1

keyfile.json:

{
    "type": "service_account",
    "project_id": "hot-deal-221803",
    "private_key_id": "2fce722d76063839c8aa1a52f590df639253e7b7",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCViCaUfJ8S7dpI\n/pYXcZ+T+nMQH0ACesKT3j/lwbWLk2PODuh+GH+IJTFY/DdBmTaVEU7QTDqP4Lbc\nLMg4KSQvreTP9doIptATx3U+1aJklWBPFP47ddVT0/mEhRfN1g/WoV+nKmoaa5pJ\nmU5THtoJ6QLEDbyZoyLLGKHezoSl+zbREqWKe+fbS1pnLtDU5y3KIHZ0FIOhEYT+\naDm9HuqKxmPURLazwF6pYAfY5guKIjsDqMDBWyN4DCGIJ20dJzCVQIlPSWKuPN+X\nEljwmFdxuMptEgwFp0R/Iy2YSSi404rAZaeQHUSuFDFGTJcRSfIyVxD0V7LHWtuc\n2dDp0jVfAgMBAAECggEABMmi2pbm4kyanu2v0TkCb/172Pn3KwfShQ4qTj6Wg80z\nS9yvAE05KsXDamL2Q0kW4KJOO13Fc5KGqE6ywRboIV1YTyRDAos8waAIQVEbwvau\nv7l0rmNbx4mo79+cXysfFLMpWd6CHoMazIfLud4/WEPionOszzUpnwZp4GANCoy6\nXDHfJHVB5/ZIWd9B+w1oSsXM/FUaR8U5DgS9Whd1EFtgS5Z0wzdDyN5yoN4sgSdl\nieGMoR/0i52cI7uvJrZS4Cndt1Lhv2IfeeDX32LDwS0LSqyEAjtJb/Io++3GFG/k\n27jGju3G7t7YrD7eZj5AptigTdbtSxhmNK13bjGF4QKBgQDD28o93hrIiJNZ3OU0\ncweje6pXfSLK/3+AriZMQfBongHFk8gEPXE3uM44EKVN4IOqqPV6GfUXL+JHPdfK\nWZ0CcNacfcn394x2x80HvJcSEn8RRWBW01hLQomZ33DNzf0EAB/KUdFaLBVt81ub\np9npuxLZnzS0eQUD0iKzKBvCLwKBgQDDcqwUbZTEFG8rbNn/VBSRpTF2quLDI4Wi\ner053/AGE0RQn2TdM+V1P5knA/n5pbo25KxhslkdiVWEua3qnXU/Cn/maRKfltzL\nYwQy4M2wFwZs8D9j7wJGZQgUDo96fXJJTyQJHl9fLy7Yvo/fGAYRMoFHqiTEOwPn\nCF23cFfj0QKBgQCiy+wc5KKKkMs55Jw3rm1o+/+o3QCwjxKiGR8IP77eloeOfLnC\nnHehA2GVxHBCfR20GuB/71eDQG/rG4JkVXxmbPhV91CLZh5BFO5dQeqoQOuRpYLg\naKd5VwMc/Va8Gj32t0u1VbCYLRBa5e79QNWmq7KNZQHgCL+cX2wsUmhQTQKBgQCQ\nId646d7NguxAr/NLkevhRFtn0bmMgoOoQK+PII/XSxoUApfVcNIEVzRQS2RrMEZU\n+OoO2gFSANcqG+wfmqK+LLYJau8q9Yw6CPkttA67jx9T8xAsWDPrSdJdSCeTAzPm\n0BAZEWbvwNHhURa0RPkkcYRZHyYh+At2svq5roWCIQKBgCqd3KNdgq28LBAdXQva\n0Nq011A55iUtT+DeZbZEdLMH5jxv8P55Z0IhvPMkVSxRIOA7quV5H9km4NzSkozS\njMko5/sA1hsDoKtFzFOIlaX95AJDzya+iEC7QtY16LDTI7phqoyIOOjNFLElmN3L\nKbqTZZDOgEXtbOhg0f5MIwdN\n-----END PRIVATE KEY-----\n",
    "client_email": "hacktivoverflow-storage@hot-deal-221803.iam.gserviceaccount.com",
    "client_id": "114012348067815611624",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/hacktivoverflow-storage%40hot-deal-221803.iam.gserviceaccount.com"
}

cron: (delete question yang upvote == 0 tiap minggu)

hosting: https://hacktivoverflow-25025.firebaseapp.com

kekurangan : signout google ngga bisa, bg process local jalan di hosting ngga jalan, bingung di bin www server.listen(443)-nya biar listen cron juga gmn

