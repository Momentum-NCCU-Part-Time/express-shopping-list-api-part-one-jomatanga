require("dotenv").config();
const express = require('express');
const morgan = require("morgan");
const mongoose = require("mongoose");

//connect to my Database 
mongoose.connect(process.env.DATABASE_URL); 
const db = mongoose.connection;
db.once('open', () => console.log('Locked in with MongoDB'));

const port = 3000; 

const app = express(); 
app.use(morgan('dev'));
app.use(express.json());


const List = require('./Models/List');

REQUESTS//
app.get('/lists', (req, res) => {
List.find({}, '___').then((results) => res.status(200).json(results))
})


app.post('/lists', (req, res) => {
    const newList = new List(req.body)
    newList.save()
    res.status(201).json(newList)
})

app.get('/lists/:listId', (req, res) => {
    List.findById(req.params.listId)
    .then((results) => {
        if (results) {
            res.status(200).json(results)
        } else {
            res.status(404).json({message: 'Not found'})
        }
    })
    .catch((error) => res.status(400).json({ message: 'No Bueno'}))
})

//Port
app.listen(port, () => console.log(`Application is running on port ${port}`));

/* GET REQ FOR ALL LISTS
app.get("/list", (req, res) => {
    List.find().then((results) => res.status().json(results));
});*/

