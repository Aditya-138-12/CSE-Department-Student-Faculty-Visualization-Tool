var admin = require("firebase-admin");

var serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL_STUDENT_AUTH
});


const db = admin.database();

module.exports = db;
