const mongoose = require('mongoose');

const shoppingListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 1,
    },
    items: [{
        name: String, 
        quantity: Number,
        purchased: Boolean,
    }],
   },
   { timestamps: true }
   )

module.exports = mongoose.model("List", shoppingListSchema); 