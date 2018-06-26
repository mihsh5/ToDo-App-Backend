const {TODOS_COLLECTION} = require('./constants');
const ObjectID = require('mongodb').ObjectID;

function addToDo(dbInstance, toDo, response, callback) {
  const toDoCollection = dbInstance.collection(TODOS_COLLECTION);
  toDoCollection.insertOne(toDo, function (error, result) {
    if (error) {
      console.log('Error in inserting ToDo');
      response.status(500).send({response: 'ToDo cannot be entered in the database'});
    } else {
      response.status(200).send({response: result.ops[0]});
    }
    callback();
  });
}

function changeStatusOfToDo(dbInstance, toDo, response, callback) {
  const toDoCollection = dbInstance.collection(TODOS_COLLECTION);
  const toDoToUpdate = { _id: new ObjectID(toDo._id) };
  const changeInToDo = {$set: {done: toDo.done}};
  toDoCollection.updateOne(toDoToUpdate, changeInToDo, function(error, result) {
    if (error) {
      console.log('Error in updating ToDo', error);
      response.status(500).send({response: 'ToDo cannot be updated in the database'});
    } else {
      console.log('Updated');
      response.status(200).send({response: result});
    }
    callback();
  });
}

function deleteToDo(dbInstance, toDo, response, callback) {
  const toDoCollection = dbInstance.collection(TODOS_COLLECTION);
  const toDoToDelete = { _id: new ObjectID(toDo._id) };
  toDoCollection.deleteOne(toDoToDelete, function(error, result) {
    if (error) {
      console.log('Error in deleting ToDo', error);
      response.status(500).send({response: 'ToDo cannot be deleted from the database'});
    } else {
      console.log('Deleted');
      response.status(200).send({response: 'Deleted todo'});
    }
    callback();
  });
}

function retrieveToDos(dbInstance, userId, response, callback) {
  const toDoCollection = dbInstance.collection(TODOS_COLLECTION);
  const toDoToFetch = {userId: userId};
  toDoCollection.find(toDoToFetch).toArray(function(error, result) {
    if (error) {
      console.log('Error in fetching ToDos');
      response.status(500).send({response: 'ToDos cannot be fetched from the database'});
    } else {
      response.status(200).send({response: result});
    }
  });
}

module.exports = {
  addToDo,
  changeStatusOfToDo,
  deleteToDo,
  retrieveToDos,
};