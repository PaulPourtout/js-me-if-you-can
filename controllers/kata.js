const express = require('express');
const Kata = require('../models/kata');

const ctrl = {};

ctrl.getAll = (req, res) => {
    Kata.find()
        .then(katas => res.json({success: true, result: katas}))
        .catch(err => res.json({success: false, message: err}))
}

ctrl.getById = (req, res) => {
    Kata.findOne({_id: req.params.kataId})
        .then(kata => res.json({success: true, result: kata}))
        .catch(err => res.json({success: false, result: err}))
}

ctrl.addOne = (req, res) => {
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
        .then(result => res.json({success: true, result: "New kata was added"}))
        .catch(err => {
            res.json({success: false, result: err})
        })
}

ctrl.addSolution = (req, res) => {
    const { solution} = req.body;
    const date = Date.now();
    // Kata.findById(req.params.kataId)
    //     .then(result => res.json({success: true, result: "Solution added"}))
    //     .catch(err => res.json({success: false, result: err}))
    Kata.findOneAndUpdate({_id: req.params.kataId},
        {
            $push:{solutions: solution}
        })
        .then(result => res.json({success: true, result: "Solution added"}))
        .catch(err => res.json({success: false, result: err}))
}

ctrl.removeSolution = (req, res) => {
    const date = Date.now();
    Kata.findOneAndUpdate({_id: req.params.kataId},
        {
            $pull: {solutions: {_id: req.params.solutionId}}
        }, {new: true})
        .then(result => res.json({success: true, result: "Solution was removed of the kata"}))
        .catch(err => res.json({success: false, result: err}))
}

ctrl.deleteOne = (req, res) => {
    Kata.findOneAndRemove({ _id: req.body.kataId })
    .then(result => res.json({ success: true, result: "kata deleted" }))
    .catch(err => res.send(err));
}

ctrl.findUserKatas = (req, res) => {
    Kata.find({'solutions.authorId': req.params.authorId})
    .select("_id description.title")
    .then(result => res.json({success: true, result}))
    .catch(err => res.json({success: false, result: err}))
}

module.exports = ctrl;