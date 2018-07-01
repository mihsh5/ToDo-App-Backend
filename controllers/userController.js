const {UserModel} = require('../models/userModel');

function logIn({userName, password}, response) {
  UserModel.findOne({userName: userName}, (error, document) => {
    if(error) {
      console.log('Database error');
      response.status(500).send({response: 'Database error'});
    } else {
      if(!document) {
        response.status(401).send({response: 'Check the username again!'});
      } else {
        if(document.password === password) {
          response.status(200).send({
            response: "LoggedIn",
            userId: document._id,
          });
        } else {
          response.status(401).send({response: "Check your password again!"});
        }
      }
    }
  });
}

function addUser(userDetails, response) {
  const newUser = new UserModel(userDetails);
  newUser.save((error, result) => {
    if(error) {
      console.log(`Couldn't add the new user because of the error ${error}`);
      response.status(409).send({response: "Duplicate username found"})
    } else {
      console.log(result);
      response.status(200).send({
        response: "Added",
        newUser: {
          id: result._id,
          userName: result.userName,
          name: result.name,
        },
      });
    }
  });
}

module.exports = {
  addUser,
  logIn,
};