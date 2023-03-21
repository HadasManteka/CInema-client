var express = require('express');
const UserController = require('../controllers/users');
const reviewController = require('../controllers/reviews');
var router = express.Router();

router.get('/getUsers', (req, res) => {
    UserController.getUsers().then(users => {
        res.send(users);
    }).catch(error => {
        res.status(500).send({error: error.message});
    });
});

router.get('/getUserById/:id', (req, res) => {
    const id = req.params.id;
    UserController.getUserById(id).then(user => {
        res.send(user);
    }).catch(error => {
        res.status(500).send({error: error.message});
    });
});

router.get('/getUserByEmail/:email', (req, res) => {
    const email = req.params.email;
    UserController.getUserByEmail(email).then(user => {
        res.send(user);
    }).catch(error => {
        res.status(500).send({error: error.message});
    });
});

router.delete('/deleteUserByEmail/:email', (req, res) => {
    const email = req.params.email;
    UserController.deleteUserByEmail(email).then(user => {
        reviewController.deleteReviewsByUserEmail(email).then(r => {
            res.status(200).send();
        })
    }).catch(error => {
        res.status(500).send({error: error.message});
    });
});

router.get('/doesEmailExists/:email', (req, res) => {
    const email = req.params.email;
    UserController.getUserByEmail(email).then(user => {
        res.send(user.length > 0);
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

router.post('/createUser', (req, res) => {
    const user = req.body.user;
    console.log(user)
    UserController.createUser(user).then(createdUser => {
        res.send(createdUser);
    }).catch(error => {
        res.status(500).send({error: error.message});
    });
});

module.exports = router;
