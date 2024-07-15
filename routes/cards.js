//Setting up the router object
const express = require("express");
const router = express.Router();

//Getting the necessary data for this part of the application
const cards = require("../data/cards");
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
        if (req.body.userId && req.body.person && req.body.album && req.body.year && req.body.rarity && req.body.imgLink && request.body.collect){
            const card = {
                id: cards.length() + 1, //need to calculate id some way
                userId: req.body.userId,
                person: req.body.person,
                group: "",
                album: req.body.album,
                year: req.body.year,
                rarity: req.body.rarity,
                imgLink: req.body.imgLink,
                collect: req.body.collect
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

    })
    .delete((req, res, next) => {

    })


module.exports = router;

