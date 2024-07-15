const express = require("express");
const path = require("path");
const router = express.Router();

const app = express();
const port = 3000;

const bodyParser = require("body-parser");

const cards = require("./routes/cards");

app.set("views", "./views"); //pointing to view directory
app.set("view engine", "pug"); // specifying what view engine I want to use

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

app.use("/cards", cards);

app.use(express.static("public"));

// router
//     .route("/")
//     .get((req,res)=> {
//         //If you're logged in, you're redirected to home, otherwise you stay on the login/signup page
//         res.send("Hello!");
//         res.render("login");
       
//     })

app.get("/", (req,res)=> {
    res.render("login");
})

app.listen(port, ()=>{
    console.log("Server is running... ");
})
