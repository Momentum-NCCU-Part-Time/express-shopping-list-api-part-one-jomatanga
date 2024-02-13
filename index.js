require("dotenv").config();

const express = require('express');
const app = express(); 

const morgan = require("morgan");
const mongoose = require("mongoose");
const port = 3000; 

const List = require("./Models/List");

mongoose.connect(process.env.DATABASE_URL); 
//Port
app.listen(port, () => console.log(`Application is running on port ${port}`));

/* GET REQ FOR ALL LISTS
app.get("/list", (req, res) => {
    List.find().then((results) => res.status().json(results));
});*/
