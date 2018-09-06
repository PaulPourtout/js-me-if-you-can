const express = require('express');
const Kata = require('../models/kata');

const ctrl = {
    getAll : (req, res) => {
        console.log("THIS IS A LOG TEST")
        Kata.find()
            .then(katas => res.json({success: true, result: katas}))
            .catch(err => res.json({success: false, message: err}))
    },
    
    getById : (req, res) => {
        Kata.findOne({_id: req.params.kataId})
            .populate('solutions.authorId', '_id username')
            .then(kata => res.json({success: true, result: kata}))
            .catch(err => res.status(500).json({success: false, result: err}))
    },
    
    addOne : (req, res) => {
        const {
            functionName,
            parameterName,
            description,
            tests
        } = req.body;
        const currentDate = Date.now();
    
        const kata = new Kata({
            functionName,
            parameterName,
            description,
            tests
        });
    
        kata.save()
            .then(result => res.json({success: true, result: "New kata added"}))
            .catch(err => {
                res.status(500).json({success: false, result: err})
            })
    },
    
    updateOne : (req, res) => {
        const { functionName, parameterName, description, tests } = req.body;

        Kata.findOneAndUpdate({_id: req.params.kataId},
            {
                $set:{functionName, parameterName, description, tests}
            })
            .then(result => res.json({success: true, result: "Kata updated"}))
            .catch(err => res.status(500).json({success: false, result: err}))
    },

    addSolution : (req, res) => {
        const { solution } = req.body;

        Kata.findOneAndUpdate({_id: req.params.kataId},
            {
                $push:{solutions: solution}
            })
            .then(result => res.json({success: true, result: "Solution added"}))
            .catch(err => res.status(500).json({success: false, result: err}));

    },
    
    removeSolution : (req, res) => {
        Kata.findOneAndUpdate({_id: req.params.kataId},
            {
                $pull: {solutions: {_id: req.params.solutionId}}
            }, {new: true})
            .then(result => res.json({success: true, result: "Solution was removed from the kata"}))
            .catch(err => res.status(500).json({success: false, result: err}))
    },
    
    deleteOne : (req, res) => {
        Kata.findOneAndRemove({ _id: req.params.kataId })
        .then(result => res.json({ success: true, result: "kata deleted" }))
        .catch(err => res.status(500).send(err));
    },
    
    findUserKatas : (req, res) => {
        Kata.find({'solutions.authorId': req.params.authorId})
        .select("_id description.title")
        .then(result => res.json({success: true, result}))
        .catch(err => res.status(500).json({success: false, result: err}))
    }
};

module.exports = ctrl;
