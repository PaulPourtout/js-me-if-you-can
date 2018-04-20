const express = require('express');
const UserCtrl = require('./controllers/user');

exports.userRouter = express
    .Router()
    .get('/:userId', UserCtrl.getById)
    .get('/', UserCtrl.getAll)
    .post('/', UserCtrl.addOne)
    // .put('/:userId', UserCtrl.updateOne)
    .delete('/:userId', UserCtrl.deleteOne)

