const express = require("express");

const app = express();
const port = 3000;

const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const cards = require("./routes/cards");
const users = require("./routes/users");

app.set("views", "./views"); //pointing to view directory
app.set("view engine", "pug"); // specifying what view engine I want to use

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

// Logging Middlewaare
app.use((req, res, next) => {
    const time = new Date();
  
    console.log(
      `-----
  ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
    );
    if (Object.keys(req.body).length > 0) {
      console.log("Containing the data:");
      console.log(`${JSON.stringify(req.body)}`);
    }
    next();
  });

app.use(express.static("public"));
app.use(fileUpload());

app.use("/api/cards", cards);
app.use("/api/users", users);

app.get("/", (req,res) => {

        async function getCards() {
            let response = await fetch("http://localhost:3000/api/cards");
            let allCards = await response.json();
        
        
            if (Object.keys(allCards).length != 0) {
                res.render("cardsDirectory", {data: allCards});
            }
        }

        getCards();


        
    })

app.post("/", (req, res) => {
        res.redirect("/addCard");
    })

app.get("/addCard", (req, res) => { //For testing purposes, the userId is automatically set to 203 but this would be a number generated from logging in
    res.render("addCards", {userId: "203"});
})

// 404 Middleware
app.use((req, res, next) => {
    next(error(404, "Resource Not Found"));
  });
  
  // Error-handling middleware.
  // Any call to next() that includes an
  // Error() will skip regular middleware and
  // only be processed by error-handling middleware.
  // This changes our error handling throughout the application,
  // but allows us to change the processing of ALL errors
  // at once in a single location, which is important for
  // scalability and maintainability.
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
  });

app.listen(port, ()=>{
    console.log("Server is running... ");
})
