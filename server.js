const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection
db.on('error', error => console.log(error));
db.once('open', _ => console.log('Connected to database'));


app.use(express.static('public'));

app.listen(1000);