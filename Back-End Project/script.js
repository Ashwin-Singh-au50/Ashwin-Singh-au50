const http = require('http')
const fs = require('fs')
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const app = express();
const port = 5000;

MongoClient.connect('mongodb+srv://ashwin:aashu12@atlascluster.avls3ca.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  console.log('Connected to MongoDB database...');

  // Set up Express routes 
  app.get('/', (req, res) => {
    const db = client.db('my_database');
    db.collection('projects').find().toArray((err, results) => {
      if (err) throw err;
      res.render('projects.ejs', { portfolioItems: results });
    });
  });
});

app.set('view engine', 'ejs');


app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
