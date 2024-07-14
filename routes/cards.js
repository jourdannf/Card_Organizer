//Setting up the router object
const express = require("express");
const router = express.Router();

//Getting the necessary data for this part of the application
const cards = require("../data/cards");

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

        
            // //Check if userID exists as a query; if so filter for all the IDs with that uesrID
            // if (!q) {
            //     return data
            // }else {

            //     const userCards = data.filter((c)=> {
            //         //Check if any of the items are not in c
            //         //Return false for any query item on the list that's not in queryList
            //         for (let i = 0; i < queryList.length; i ++){
            //             const item = queryList[i];
            //             if (c[item] != req.query[item]){
            //                 return false;
            //             }
            //         }
            //         return true;
            //     });

            //     return userCards;
            // }
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
                console.log(finalResult);
                finalResult = secResult;
               }
            }
            
            if (finalResult.length != 0) res.json(finalResult);
            else next();
        }
    
    })


module.exports = router;

