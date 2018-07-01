const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const bodyParser = require('body-parser');
const multer = require('multer');
// const MongoClient = require('mongodb').MongoClient;

const {addUser, logIn} = require('./controllers/userController');
const {addToDo, changeStatusOfToDo, deleteToDo, retrieveToDos} = require('./todoController');
const {CONNECTION_URI, DB_NAME} = require('./constants');

const upload = multer();

const app = express();
const corsOptions = {
  origin: ['https://1vz2zrvpq4.codesandbox.io', 'https://v3963rqvly.codesandbox.io']
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(CONNECTION_URI)
  .catch(error => console.log(`Couldn't connect with the database with the following error: ${error}`))
  .then(() => console.log(`Connected to the database`));

app.post('/newUser', upload.array(), function(request, response) {
  addUser(request.body, response);
});

app.post('/login', upload.array(), function(request, response) {
  logIn(request.body, response);
});

app.post('/newToDo', upload.array(), function(request, response) {
  MongoClient.connect(CONNECTION_URI, function (error, dbClient) {
    if(error) {
      console.log('Cannot connect to the database');
      response.status(500).send({response: "Cannot connect to the database"});
      return;
    }
    const dbInstance = dbClient.db(DB_NAME);
    addToDo(dbInstance, request.body, response, () => dbClient.close());
  });
});

app.post('/changeStatusOfToDo', upload.array(), function(request, response) {
  MongoClient.connect(CONNECTION_URI, function(error, dbClient) {
    if(error) {
      console.log('Cannot connect to the database');
      response.status(500).send({response: "Cannot connect to the database"});
      return;
    }
    const dbInstance = dbClient.db(DB_NAME);
    changeStatusOfToDo(dbInstance, request.body, response, () => dbClient.close());
  });
});

app.delete('/deleteToDo', upload.array(), function(request, response) {
  MongoClient.connect(CONNECTION_URI, function(error, dbClient) {
    if(error) {
      console.log('Cannot connect to the database');
      response.status(500).send({response: "Cannot connect to the database"});
      return;
    }
    const dbInstance = dbClient.db(DB_NAME);
    deleteToDo(dbInstance, request.body, response, () => dbClient.close());
  });
});

app.post('/getToDos', upload.array(), function(request, response) {
  MongoClient.connect(CONNECTION_URI, function(error, dbClient) {
    if(error) {
      console.log('Cannot connect to the database');
      response.status(500).send({response: "Cannot connect to the database"});
      return;
    }
    const dbInstance = dbClient.db(DB_NAME);
    retrieveToDos(dbInstance, request.body.userId, response, () => dbClient.close());
  });
});

app.get('/about', function(request, response) {
  response.send('This is Mihir');
});
app.listen(3000);