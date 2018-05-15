const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kataSchema = new Schema({
    functionName: {type: String, required: true},
    description: {
        title: {type: String, required: true},
        content: {type: String, required: true},
        example: {type: String, required: false}
    },
    baseFunction: {type: String, required: true},
    tests: [{
        arg: Schema.Types.Mixed,
        solution: Schema.Types.Mixed,
        assertFunc: String
    }],
    created_at: Date,
    updated_at: Date,
})

const Kata = mongoose.model('Kata', kataSchema);

module.exports = Kata;