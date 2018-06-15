const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serieSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    katas: [{type: mongoose.Schema.Types.ObjectId, ref: 'Kata'}],
    }, {timestamps: true});
    
const Serie = mongoose.model("Serie", serieSchema);

module.exports = Serie;
