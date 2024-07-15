//Setting up the router object
const express = require("express");
const router = express.Router();

//Getting the necessary data for this part of the application
const cards = require("../data/cards");
const users = require("../data/users");
const fs = require("fs");

//Get all the cards from the data set
router
    .route("/")
    .get((req,res, next)=>{

        //Get all the queries from req.query and if it returns an empty object then it's a normal unfiltered get

        //Input dataset and name of the filter
        //Return new dataset with that filter

        function filterByItem(data, queryItem){

            const filteredCards = data.filter((c)=> {
                return c[queryItem] == req.query[queryItem]
            });

            return filteredCards;
        }

        let finalResult = [];

        if(Object.keys(req.query).length == 0){
            res.json(cards);
        }else {
            const queries = Object.keys(req.query);

            for (q of queries){
               const newArray = filterByItem(cards, q);
               if (finalResult.length == 0){
                finalResult = newArray;
               }else {
                const secResult = finalResult.filter(e => {
                    return newArray.includes(e);
                })
                finalResult = secResult;
               }
            }
            
            if (finalResult.length != 0) {
                res.json(finalResult);
            } else next();
        }
    
    })
    .post((req, res, next)=> {
        let cardImg;
        //Note: Users can submit the same card more than once as multiples of the same card can exist in a physical collection

        if (req.body.userId && req.body.person && req.body.album && req.body.year && req.files.cardImg.name && request.body.collect){
            //Check if userId exists in users database, then create card and update users cardCollected

            const collected = req.body.collect == "true"? true : false;

            const user = users.find((u) => {
                return u.userId == req.body.userId;
            })

            if (!user){
                next()
                res.end()
            }

            //Add cardImg file to images folder
            cardImg = req.files.cardImg;
            let uploadPath = __dirname + "../public/images/" + cardImg.name

            cardImg.mv(uploadPath, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }

                res.send("File Uploaded!");
                res.redirect("/");
            })

            //Check for card already in database
            //If in database, then checks if user is already collecting and updates the count if user already collects

            const sameCard = cards.find((c) => {
                return (c.userId == req.body.userId)&& (c.person == req.body.person) && (c.album == req.body.album) && (c.year == req.body.year) && (c.cardImg == req.files.cardImg.name)
            })

            if (sameCard && sameCard.collect) {
                sameCard.count += 1;
                res.end();
            }else if (sameCard && !sameCard.collect && collected){
                sameCard.count += 1;
                sameCard.collect == true;
                res.end()
            }else if (sameCard && !sameCard.collect && !collected){
                next();
                res.end()
            }
            
            const card = {
                id: cards.length() + 1, //need to calculate id some way
                userId: req.body.userId,
                person: req.body.person,
                group: "",
                album: req.body.album,
                year: req.body.year,
                rarity: 0,
                cardImg: req.files.cardImg.name,
                collect: collected
            }

            if (collected){
                user.cardsCollected += 1;
                card.count = 1
            }else if (!collected){
                card.count = 0
            }

            if (req.body.group){
                card.group = req.body.group
            }
            
            cards.push(card);
            res.json(cards[cards.length-1]);
        }else next();
    });

router
    .route("/:id")
    .put((req,res,next) => {
        //Find the card with that specific ID
        //Update with information from body

        const card = cards.find((c) => {
            if (c.id == req.params.id) {
                for (const key in req.body){
                    c[key] = req.body[key];
                }
                return true;
            }
        });

        if (card) res.json(card);
        else next();
    })
    .delete((req, res, next) => {
        //Find the card with that specific ID
        //Delete from cards array

        const card = cards.find((c, i) => {
            if (c.id == req.params.id) {
                cards.splice(i, 1);
                return true
            }
        });

        const user = users.find((u) => {
            return u.userId == card.userId;
        })

        user.cardsCollected -= 1;

        if (card) res.json(card);
        else next();
    })


module.exports = router;

