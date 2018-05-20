const express = require('express');
const Kata = require('../models/kata');

const ctrl = {};

ctrl.getAll = (req, res) => {
    Kata.find()
        .then(katas => res.json({success: true, result: katas}))
        .catch(err => res.json({success: false, message: err}))
}

ctrl.getById = (req, res) => {
    Kata.findById(req.params.kataId)
        .then(kata => res.json({success: true, result: kata}))
        .catch(err => res.json({success: false, message: err}))
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
        tests,
        created_at: currentDate,
        updated_at: currentDate,
    });

    kata.save()
        .then(result => res.json({success: true, message: "New kata was added"}))
        .catch(err => {
            res.json({success: false, message: err})
        })
}

ctrl.addSolution = (req, res) => {
    const { solution} = req.body;
    const date = Date.now();
    // Kata.findById(req.params.kataId)
    //     .then(result => res.json({success: true, message: "Solution added"}))
    //     .catch(err => res.json({success: false, message: err}))
    Kata.findOneAndUpdate({_id: req.params.kataId},
        {
            $push:{solutions: solution},
            $set:{updated_at: date}
        })
        .then(result => res.json({success: true, message: "Solution added"}))
        .catch(err => res.json({success: false, message: err}))

}

ctrl.removeSolution = (req, res) => {
    const date = Date.now();
    Kata.findOneAndUpdate({_id: req.params.kataId},
        {
            $pull: {solutions: {_id: req.params.solutionId}},
            $set: {updated_at: date}
        }, {new: true})
        .then(result => res.json({success: true, message: "Solution was removed of the kata"}))
        .catch(err => res.json({success: false, message: err}))
}

ctrl.deleteOne = (req, res) => {
    Kata.findOneAndRemove({ _id: req.body.kataId })
    .then(result => res.json({ success: true, message: "kata deleted" }))
    .catch(err => res.send(err));
}

module.exports = ctrl;