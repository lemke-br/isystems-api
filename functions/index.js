const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();

admin.initializeApp();

app.use(cors({ origin: true }));

//Write All
app.post('/', async (req, res) => {
  const user = req.body;
  await admin.firestore().collection('participants').add(user); 
  res.status(201).json({ general: "Created"});
});

//Read All
app.get('/', async (req, res) => {
  const snapshot = await admin.firestore().collection('participants').get();
  let users = [];
  snapshot.forEach(doc => {
    let id = doc.id;
    let data = doc.data();
    users.push({id, ...data});
  });
  res.status(200).send(JSON.stringify(users));
});

//Read One
app.get("/:id", async (req, res) => {
  const snapshot = await
  admin.firestore().collection('participants').doc(req.params.id).get();
  const userId = snapshot.id;
  const userData = snapshot.data();
  res.status(200).send(JSON.stringify({id: userId, ...userData}));
})

//Delete
app.delete("/:id", async (req, res) => {
  await
  admin.firestore().collection("participants").doc(req.params.id).delete();
  res.status(200).send();
})

//Update
app.put("/:id", async (req, res) => {
  const body = req.body;
  await 
  admin.firestore().collection('participants').doc(req.params.id).update(body);
  res.status(200).send()
});

exports.api = functions.https.onRequest(app);