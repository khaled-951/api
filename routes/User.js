const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userSchema = require('../models/User');
const User = mongoose.model('users', userSchema);
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const res = require('express/lib/response');
const { response } = require('express');

router.post('/register', body('email').isEmail(), async (req, res) => {
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()) return res.status(400).send('Verify Your Inputs Please');
	const new_user = new User({ firstName: req.body.firstname,
             lastName: req.body.lastname, 
             email: req.body.email, 
             password: await bcrypt.hash(req.body.password, 10) });
	new_user.save();
    return res.status(200).send('done');
});

router.post('/login', body('email').isEmail(), async (req, res) => {
    const validationErrors =  validationResult(req);
    if(!validationErrors.isEmpty()) return res.status(400).send('Verify Your Inputs Please');

    foundUser = await User.findOne({email: req.body.email});
    if (foundUser && await bcrypt.compare(req.body.password, foundUser.password) )
        return res.status(200).send(jwt.sign({ id: foundUser._id, firstName: foundUser.firstname, email: foundUser.email }, 'secret' ) );
    return res.status(400).send('Verify Your Inputs Please');
});

router.get('/verify', (req, res) =>{
    return res.send('connected');
})

module.exports = router ;