const express = require('express');
const User = require('../models/user');

const ctrl = {};

    ctrl.getById = (req, res) => {
        User
            .findOne({_id: req.params.userId})
            .then(result => res.json(result))
            .catch(err => res.send(err))
    }
    
    ctrl.getAll = (req, res) => {
        User
            .find({})
            .then(result => res.json(result))
            .catch(err => res.send(err))
    }

    ctrl.addOne = (req, res) => {
        const {name, username, password} = req.body;
        const currentDate = Date.now();

        const user = new User({
            name,
            username,
            password,
            admin: false,
            created_at: currentDate,
            updated_at: currentDate,
            friends: [],
        });

        user.save()
            .then(result => res.json({message: 'user in da place !'}))
            .catch(err => {
                if (err.code == 11000) res.json({message: 'user already exists'})
                else res.send(err)
            })

    }

    // ctrl.updateOne = (req, res) => {
    //     const {name, username, password, created_at, admin, friends} = req.body;
    //     const currentDate = Date.now();
    //     const updateUserInfo = {
    //         ...req.body,
    //         updated_at: currentDate,
    //     }
        
    //     User.findByIdAndUpdate(req.params.id, updateUserInfo, (err, raw) => {
    //         if (err) res.send(err)

    //         res.json(raw)
    //     })
    // }

    ctrl.deleteOne = (req, res) => {
        User.findOneAndRemove({_id: req.params.userId})
        .then(result => res.json({message: 'user deleted'}))
        .catch(err => res.send(err))
    }

module.exports = ctrl;
    