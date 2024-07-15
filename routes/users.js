//Setting up the router object

const express = require("express");
const router = express.Router();

//Getting the data
const users = require("../data/users");

router
    .route("/")
    .get((req, res) => {
        res.json(users);
    })
    .post((req, res, next) => {
        if (req.body.name.first && req.body.name.last && req.body.profilePic && req.body.bio && req.body.username && req.body.password) {
            const user = {
                userId: users[users.length-1].userId + 1,
                name: {
                    first: req.body.name.first,
                    last: req.body.name.last
                },
                profilePic: req.body.profilePic,
                cardsCollected: 0,
                bio: req.body.bio,
                username: req.body.username,
                password: req.body.password
            }
        }
    })

router
    .route("/:id")
    .get((req, res) => {

    })
    .put((req, res) => {
        
    })