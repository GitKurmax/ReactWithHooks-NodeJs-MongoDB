const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: false
    },

    age: {
        type: Number,
        min: 5,
        max: 80,
        default: 20,
        unique: false
    } 
});

mongoose.model('persons', PersonSchema);