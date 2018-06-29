const mongoose = require('mongoose');

const db = mongoose.connect('mongod://localhost/jsing')
    .then(res => console.log('db connected'))
    .catch(err => console.error('Error', err));

module.exports = db;