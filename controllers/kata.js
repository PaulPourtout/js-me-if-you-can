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
        description,
        baseFunction,
        tests
    } = req.body;
    const currentDate = Date.now();

    const kata = new Kata({
        functionName,
        description,
        baseFunction,
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

module.exports = ctrl;