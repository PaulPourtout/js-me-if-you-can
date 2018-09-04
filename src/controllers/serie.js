const express = require("express");
const Serie = require("../models/serie");


const ctrl = {    
    getById : (req, res, next) => {
        Serie.findById(req.params.serieId)
        .populate({path: 'katas'})
        .then(result => {
            if (result) {
                return res.json({success: true, result})
            }
            else {
                return res.json({success: false, result: "no serie found"})
            }
        })
        .catch(err => next({status: 500, message: "Error during request"}));
    },
		
	getAll : (req, res) => {
		Serie.find({})
		.then(result => res.json({success: true, result}))
		.catch(err => res.send(err));
	},

	addOne : async (req, res, next) => {
		const { title, description, katas } = req.body;

		const serie = new Serie({
			title,
            description,
            katas
		});

		serie
		.save()
		.then(result => res.json({ success: true, message: "Serie added" }))
		.catch(err => next({status: 500, message: "Error during request"}));
    },
    
    updateOne : (req, res, next) => {
        const {title, description, katas} = req.body;
        
        Serie.findOneAndUpdate({ _id: req.params.serieId },
        {
            $set: { title, description, katas }
        })
        .then(result => res.json({success: true, result: "Serie Updated"}))
        .catch(err => next({status: 500, message: "Error during request"}));
    },

	deleteOne : (req, res, next) => {
		Serie.remove({ _id: req.params.serieId })
		.then(result => res.json({ success: true, message: "serie deleted" }))
		.catch(err => next({status: 500, message: "Error during request"}));
    },
};



module.exports = ctrl;
