const express = require("express");
const Serie = require("../models/serie");


const ctrl = {    
    getById : (req, res) => {
        Serie.findById(req.params.serieId)
        .populate({path: 'katas'})
        .then(result => res.json({success: true, result}))
        .catch(err => res.json({success: false, result: err}))
    },
		
	getAll : (req, res) => {
		Serie.find({})
		.then(result => res.json({success: true, result}))
		.catch(err => res.send(err));
	},

	addOne : async (req, res) => {
		const { title, description, katas } = req.body;

		const serie = new Serie({
			title,
            description,
            katas
		});

		serie
		.save()
		.then(result => res.json({ success: true, message: "Serie added" }))
		.catch(err => res.send({success: false, message: err}));
	},

	deleteOne : (req, res) => {
		Serie.remove({ _id: req.params.serieId })
		.then(result => res.json({ success: true, message: "serie deleted" }))
		.catch(err => res.send({success: false, message: err}));
    },
};



module.exports = ctrl;
