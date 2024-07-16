//Setting up the router object

const express = require("express");
const router = express.Router();

//Getting the data
const users = require("../data/users");
const error = require("../utilities/error");

router
    .route("/")
    .get((req, res) => {
        res.json(users);
    })
    .post((req, res, next) => {
        
        if (req.body.name.first && req.body.name.last && req.body.profilePic && req.body.bio && req.body.username && req.body.password) {
            const isMatch = users.find((u)=> {
                return (req.body.username == u.username);
            });
    
            if (isMatch) {
                return next(error(404, "Resource already exists"))
            }
            
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

            users.push(user);
            res.json(user);
  
        }else{
            return next(error(400, "Bad Request"))
        }
    })

router
    .route("/:id")
    .get((req, res, next) => {
        const user = users.find((u) => {
            return u.userId == req.params.id
        })

        if (user) return res.json(user);
        else return next();
    })
    .put((req, res) => {
        const user = users.find((u) => {
            if (u.userId == req.params.id) {
                for (key in req.body){
                    u[key] = req.body[key];
                }
                return true
            }
        });

        if (user) res.json(user);
        else next();
    });

    module.exports = router;