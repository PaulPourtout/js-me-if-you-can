const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kataSchema = new Schema({
    functionName: {type: String, required: true},
    parameterName: {type: String, required: true},
    solutions: [{
        authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true},
        value: {type: String, required: true},
        timeScore: {type: Number, required: false}
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
    }]
}, {timestamps: true})

const Kata = mongoose.model('Kata', kataSchema);

module.exports = Kata;