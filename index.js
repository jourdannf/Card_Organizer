const express = require("express");

const app = express();
const port = 3000;

const bodyParser = require("body-parser");

const cards = require("./routes/cards");

app.set("views", "./views"); //pointing to view directory
app.set("view engine", "pug"); // specifying what view engine I want to use

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

app.use("/api/cards", cards);

app.get("/", async (req,res)=> {
    let response = await fetch("http://localhost:3000/api/cards")
    let allCards = await response.json()


    if (Object.keys(allCards).length != 0) {
        res.render("cardsDirectory", {data: allCards})
    }
    
    
});


app.listen(port, ()=>{
    console.log("Server is running... ");
})
