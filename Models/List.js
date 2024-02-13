const mongoose = require('mongoose');

const shoppingListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 1,
    },
items: [
    item: String, 
    quantity: Number,
    Purchased: Boolean,
    {
        createdAt: {
            type: Date,
        default: Date.now,
        required: true,
        }
        updatedAt: {

        }
    }
]
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updatedAt: {
        type: Date,
    }
});

//tell mongoose to use this model and insert
//const shoppingList = mongoose.model('shoppingList', shoppingListSchema); 

module.exports = mongoose.model("List", shoppingListSchema); 