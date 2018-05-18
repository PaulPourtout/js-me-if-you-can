const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kataSchema = new Schema({
    functionName: {type: String, required: true},
    parameterName: {type: String, required: true},
    solutions: [{
        authorName: {type: String, required: true},
        authorId: {type: String, required: true},
        value: {type: String, required: true}
    }],
    description: {
        title: {type: String, required: true},
        content: {type: String, required: true},
        example: {type: String, required: false}
    },
    tests: [{
        arg: String,
        solution: Schema.Types.Mixed,
        assertFunc: String
    }],
    created_at: Date,
    updated_at: Date,
})

const Kata = mongoose.model('Kata', kataSchema);

module.exports = Kata;