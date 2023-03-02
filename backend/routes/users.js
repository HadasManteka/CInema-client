var express = require('express');
const mongoose = require('mongoose')
const UserController = require('../controllers/users')
var router = express.Router();
var connectionString = "mongodb://mongo:secret@localhost:27017/";

mongoose.connect(connectionString)

router.get('/getUsers', (req, res) => {
    UserController.getUsers().then(users => {
        res.send(users);
    }).catch(error => {
        res.status(500).send({error: error.message});
    });
});

router.post('/getUserById/:id', (req, res) => {
    const id = req.params.id;
    UserController.getUserById(id).then(user => {
        res.send(user);
    }).catch(error => {
        res.status(500).send({error: error.message});
    });
});

router.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body;
    user.id = id;
    UserController.updateUser(user).then(updatedUser => {
        res.send(updatedUser);
    }).catch(error => {
        res.status(500).send({error: error.message});
    });
});

module.exports = router;
