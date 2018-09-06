const express = require("express");
const User = require("../models/user");
const crypt = require("../auth/crypt");
const isEmptyString = require("../utils/stringUtils");

const ctrl = {
	getById : (req, res) => {
		User
		.findById(req.params.userId)
		.then(result => res.json(result))
		.catch(err => res.send(err))
	},
		
	getAll : (req, res) => {
		User.find({})
		.then(result => res.json(result))
		.catch(err => res.send(err));
	},

	addOne : async (req, res, next) => {
		const { username, password, email } = req.body;
        const currentDate = Date.now();
        
        if (isEmptyString(username)
        || isEmptyString(password)
        || isEmptyString(email)) {
            next({status: 412, message: "Failed. Missing field for user creation."})
        }

		let hashPassword = await crypt.hashPassword(password);

		const user = new User({
			username,
			email,
			password: hashPassword,
			admin: false,
			created_at: currentDate,
			updated_at: currentDate,
			friends: []
        });

		user
		.save()
		.then(result => {
            res.json({
                success: true,
                message: "Your account is ready"
            })
        })
		.catch(err => {
			if (err.code === 11000) {
                let field = err.message.split(".$")[1];
                field = field.split(" dup key")[0];
                field = field.substring(0, field.lastIndexOf("_"));

                next({
                    status: 412,
                    message: `Failed. An account with this ${field} already exist.`
                });
            }
			else {
                next({status: 400, message: "error here"})
            }
		});
	},

	addFriend : (req, res) => {
		const { userId, friendId } = req.params;

		User.findById(userId)
		.then(user => {
			user.friends.push(friendId);
			user.save((err, updatedUser) => {
			if (err) console.error(err);
			res.send(updatedUser);
			});
		})
		.catch(err => console.error(err));
    },
    
    getNumberOfKatasDoneByUser : (req, res, next) => {
        const { userId } = req.params;

        User.findById(userId)
        .select("katasDone")
        .then(katas => res.json({
            success: true,
            message: {
                katasDoneByUser: katas.katasDone.length
            }
        }))
        .catch(err => next({status: 400, message: err}))
    },

	// updateOne : (req, res) => {
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
	// },

	deleteOne : (req, res) => {
		User.findOneAndRemove({ _id: req.params.userId })
		.then(result => res.json({ success: true, message: "user deleted" }))
		.catch(err => res.send(err));
	}
};



module.exports = ctrl;
