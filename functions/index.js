const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions');
const uuidv5 = require('uuid/v5')

const app = express();
app.use(cors());
const admin = require('firebase-admin');
admin.initializeApp();


// POSTING DATA TO FIREBASE REALTIME DATABASE
app.post('/', (req, res) => {
    const addUser = req.body;
    const id = uuidv5('https://shrouded-temple-77848.herokuapp.com/', uuidv5.URL)
    addUser.userId = id
    return admin.database().ref('/users').push(entry)
    .then(() => {
        return res.status(200).send(addUser)
    }).catch(error => {
        console.error(error);
        return res.status(500).send('Oh no! Error: ' + error);
    });
  });


  // GETTING DATA FROM FIREBASE REALTIME DATABASE
  app.get("/", (req, res) => {
    return admin.database().ref('/user').on("value", snapshot => {
        return res.status(200).send(snapshot.val());
    }, error => {
        console.error(error);
        return res.status(500).send('Oh no! Error: ' + error);
    });
});

exports.users = functions.https.onRequest(app)
