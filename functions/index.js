const functions = require('firebase-functions');
const admin = require("firebase-admin");
const app = require("express")();

admin.initializeApp();
const db = admin.firestore().collection("participants");

//GET Function
app.get("/participants", function (request, response) {
  db.get()
    .then(function (docs) {
      let todos = [];
      docs.forEach(function (doc) {
        todos.push({
          id: doc.id,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          participation: doc.data().participation
        })
      })
      response.json(todos);
    });
})

//POST Function
app.post("/participants", function (request, response) {
  db.add({ 
    firstName: request.body.firstName, 
    lastName: request.body.lastName, 
    participation: request.body.participation  
  })
    .then(function () {
      response.json({ 
        general: "Works" });
    })
})

exports.api = functions.https.onRequest(app)