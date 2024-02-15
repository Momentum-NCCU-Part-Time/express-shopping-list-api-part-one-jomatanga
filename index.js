require("dotenv").config();
const express = require('express');
const morgan = require("morgan");
const mongoose = require("mongoose");

//connect to my Database 
mongoose.connect(process.env.DATABASE_URL); 
const db = mongoose.connection;
db.once('open', () => console.log('Locked in with MongoDB'));

const port = process.env.PORT; 

const app = express(); 
app.use(morgan('dev'));
app.use(express.json());


const List = require('./Models/List');

//REQUEST TO GET ALL LISTS//
app.get('/lists', (req, res) => {
List.find().then((results) => res.status(200).json(results))
})

//CREATE A NEW LIST//
app.post('/lists', (req, res) => {
    const newList = new List(req.body)
    newList.save()
    res.status(201).json(newList)
})


// FINDING A LIST BY ITS ID
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

// UPDATING LIST TITLE BY ID
app.patch('/lists/:listId', (req, res) => {
    List.findById(req.params.listId)
    .then((list) => {
        if (list) {
            list.title = req.body.title || list.title
            list.save()
            res.status(200).json(list)
        }
        else {
            res.status(404).json({ message: 'Not found'})
        }
    })
    .catch((error) => res.status(400).json({ message: 'Bad request'}))
})

// ADDING ITEMS TO LIST BY ID
app.post('/lists/:listId/items', (req, res) => {
    List.findById(req.params.listId)
    .then((list) => {
        if (list) {
            list.items.push(req.body)
            list.save()
            res.status(201).json(list)
        }
        else {
            res.status(404).json({ message: 'Not found'})
        }
    })
    .catch((error) => res.status(400).json({ message: 'Bad request'}))
})


//Port
app.listen(port, () => console.log(`Application is running on port ${port}`));


