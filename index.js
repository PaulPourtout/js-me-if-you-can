const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {userRouter} = require('./routes');

mongoose.connect('mongodb://localhost/jsing')
    .then(res => console.log('db connected'))
    .catch(err => console.error('Error', err));


app.use(express.json());

const apiRouter = express.Router();

app.use('/api', apiRouter);

apiRouter.get('/', (req, res) => {
    res.send('API');
})

apiRouter.use('/users', userRouter)

app.get('*', (req, res) => {
    res.send('404 error')
})

app.listen(8080, (req, res) => {
    console.log('Server working on port 8080')
})