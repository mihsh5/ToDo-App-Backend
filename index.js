// Libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

// Controllers
const {addUser, logIn} = require('./controllers/userController');
const {addToDo, retrieveToDos, changeStatusOfToDo, deleteAToDo} = require('./controllers/todoController');

// Constants
const {CONNECTION_URI, DB_NAME} = require('./constants');

const upload = multer();

const app = express();

const corsOptions = {
  origin: [
    'https://1vz2zrvpq4.codesandbox.io',
    'https://v3963rqvly.codesandbox.io',
    'https://6x7197w07k.codesandbox.io',
    'https://5z36y4mzjn.codesandbox.io',
  ]
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
  addToDo(request.body, response);
});

app.post('/changeStatusOfToDo', upload.array(), function(request, response) {
  changeStatusOfToDo(request.body, response);
});

app.delete('/deleteToDo', upload.array(), function(request, response) {
  deleteAToDo(request.body, response);
});

app.post('/getToDos', upload.array(), function(request, response) {
  retrieveToDos(request.body, response);
});

app.get('/about', function(request, response) {
  response.send("This is Mihir Shah's ToDo App");
});
app.listen(3000);