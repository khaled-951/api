const express = require('express');
const app = express();
const logger = require('morgan');
const mongoose = require("mongoose");
const cors = require('cors');
const UserRouter = require('./routes/User');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', UserRouter);


mongoose.connect("mongodb+srv://khaled:khaled@cluster0.ajsco.mongodb.net/Innovation?authSource=admin&replicaSet=atlas-zv7ysq-shard-0&readPreference=primary&ssl=true"
,{useNewUrlParser: true, useUnifiedTopology: true}).catch(() => console.log('could not connect to DB'));
app.listen(3000);
console.log('Listnening on port 3000');