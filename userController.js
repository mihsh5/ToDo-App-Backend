const {USERS_COLLECTION} = require('./constants');

function logIn(dbInstance, user, response, callbackFunction) {
  const userCollection = dbInstance.collection(USERS_COLLECTION);
  userCollection.findOne({ userName: user.userName}, function(error, result) {
    if (error) {
      console.log('Database error');
      response.status(500).send({response: 'Database error'});
    }
    else if(!result) {
      console.log('No such user');
      response.status(401).send({response: 'Check username again'});
    } else {
      if (result.password === user.password) {
        response.status(200).send({
          response: 'Ok',
          userId: result._id,
        });
      }
      else 
        response.status(401).send({response: 'Incorrect password'});
    }
    callbackFunction();
  });
}

function addUser(dbInstance, newUser, response, callbackFunction) {
  const userCollection = dbInstance.collection(USERS_COLLECTION);
  userCollection.insert(newUser, function(error, result) {
    if(error) {
      console.log('Duplicate username found');
      response.status(409).send({response: 'Duplicate username found'});
    } else {
      const {userName, name, _id} = result.ops[0]
      const responseToReturn = {
        userName: userName,
        id: _id,
        name: name,
      };
      response.status(200).send({response: responseToReturn});
    }
    callbackFunction();
  });
}

module.exports = {
  addUser: addUser,
  logIn: logIn,
}