const express = require('express');
const Kata = require('../models/kata');

const ctrl = {};

ctrl.getAll = (req, res) => {
    Kata.find()
        .then(katas => res.json({success: true, result: katas}))
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
            console.log(err)
            res.json({success: false, message: err})
        })
}

ctrl.deleteOne = (req, res) => {
    Kata.findOneAndRemove({ _id: req.body.kataId })
    .then(result => res.json({ success: true, message: "kata deleted" }))
    .catch(err => res.send(err));
}

module.exports = ctrl;