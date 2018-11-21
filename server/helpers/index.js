var crypto = require('crypto');
var jwt = require('jsonwebtoken');
require('dotenv').config();
const { Storage } = require('@google-cloud/storage')
const path = require('path')
const googleCloudStorage = new Storage({
    projectId: process.env.GCLOUD_PROJECT,
    keyFilename: process.env.KEYFILE_PATH
});
const bucket = googleCloudStorage.bucket(process.env.CLOUD_BUCKET);

class Helper {
    static cryptPass(password) {
        let _salt = crypto.randomBytes(256).toString('hex')
        let pass = crypto.createHmac('sha256', _salt).update(password).digest('hex')
        let obj = {
            salt: _salt,
            pass: pass
        }
        return obj
    }
    static getToken(obj) {
        let token = jwt.sign(obj, process.env.JWT_SECRET);
        return token;
    }
    static verifyToken(token) {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded
    }
    static getCryptedPass(password, salt) {
        let result = crypto.createHmac('sha256', salt).update(password).digest('hex')
        return result
    }
    static gcsUpload(req) {
        return new Promise(function(resolve, reject) {
            const newFileName = crypto.randomBytes(16).toString('hex') + path.extname(req.file.originalname)
            const blob = bucket.file(newFileName);

            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: req.file.mimetype
                }
            });

            blobStream.on("error", err => {
                next(err);
                return;
            });

            blobStream.on("finish", () => {
                // The public URL can be used to directly access the file via HTTP.
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

                // Make the image public to the web (since we'll be displaying it in browser)
                blob.makePublic().then(() => {
                    resolve(publicUrl)
                });
            });
            blobStream.end(req.file.buffer);
        });

    }
}
module.exports = Helper