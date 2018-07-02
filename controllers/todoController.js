// Library imports
const ObjectId = require('mongoose').Types.ObjectId;

// Model imports
const { ToDosModel } = require('../models/todosModel');

function addToDo(toDoToAdd, response) {
  const newToDo = new ToDosModel(toDoToAdd);
  newToDo.save((error, result) => {
    if (error) {
      console.log(`Couldn't add the ToDo because of the error: ${error}`);
      response.status(500).send({response: "Couldn't add the ToDo"});
    } else {
      response.status(200).send({
        response: "Added",
        newToDo: result,
      });
    }
  });
}

function retrieveToDos(userDetails, response) {
  const toDosToBeFetched = {
    userId: userDetails._id,
  };
  ToDosModel.find(toDosToBeFetched, (error, result) => {
    if (error) {
      console.log(`Couldn't fetch the ToDos because of the error: ${error}`);
      response.status(500).send({response: "Couldn't fetch the ToDos"});
    } else {
      response.status(200).send({response: result});
    }
  });
}

function changeStatusOfToDo(todoDetails, response) {
  const toDoToFindAndUpdate = {
    _id: new ObjectId(todoDetails._id),
  };
  const updates = {
    $set: {
      done: todoDetails.done,
    },
  };
  ToDosModel.findOneAndUpdate(toDoToFindAndUpdate, updates, {new: true}, (error, result) => {
    console.log(result);
    response.status(200).send({
      response: "Updated",
      updatedToDo: result,
    });
  });
}

function deleteAToDo(toDoToDelete, response) {
  const toDoToFindAndDelete = {
    _id: new ObjectId(toDoToDelete._id),
  };
  ToDosModel.findOneAndRemove(toDoToFindAndDelete, (error, result) => {
    if(error) {
      console.log(`Couldn't delete the ToDo because of the error: ${error}`);
      response.status(500).send({
        response: "Couldn't delete the ToDo",
      });
    } else {
      response.status(200).send({
        response: "Deleted",
      })
    }
  });
}

module.exports = {
  addToDo,
  changeStatusOfToDo,
  deleteAToDo,
  retrieveToDos,
};