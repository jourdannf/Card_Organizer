const express = require("express");
const app = express();
const port = 3000;

const cards = require("./routes/cards");

app.use("/cards", cards);

app.listen(port, ()=>{
    console.log("Server is running... ");
})
